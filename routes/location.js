const express = require('express')
const router = express.Router()

const getresults = require('../public/athenawrap')

router.post('/', (req, res, next) => {
    
    console.log(req.body)
    console.log(req.body.coord)
    console.log('Made it to the location route!')
    
    //  prepare query
    let query = 'SELECT * FROM covid19enigmadata WHERE "lat" = ' 
        + req.body.coord.lat + ' AND "long" = '
        + req.body.coord.long

    let awscreds = req.body.awscreds
    //console.log(awscreds)

    let s3 = req.body.s3
    let db = req.body.db

    console.log('s3 bucket to write results... ', s3)
    console.log('glue db to use... ', db)

    //  call Athena Wrapper function
    getresults.getAthenaResults(awscreds, s3, db, query)
        .then(data => {
            console.log(data.Items[0].icu)
            //res.json({'data': data.Items[0]})
            //  send results to client
            res.json({'status': 'success', 'cases': data.Items[0].cases, 'deaths': data.Items[0].deaths,'recovered': data.Items[0].recovered})
        })
        .catch(err => {
            console.log(err)
            res.json({'status': 'failure', 'message': err})
        })
})

module.exports = router