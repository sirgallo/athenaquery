const express = require('express')
const router = express.Router()

const getresults = require('../public/athenawrap')

router.post('/', (req, res, next) => {
    
    console.log(req.body.query)
    console.log('Made it to the query route!')
    
    let query = req.body.query

    let awscreds = req.body.awscreds

    let s3 = req.body.s3
    let db = req.body.db

    console.log('s3 bucket to write results... ', s3)
    console.log('glue db to use... ', db)

    //  call Athena Wrapper function
    getresults.getAthenaResults(awscreds, s3, db, query)
        .then(data => {
            res.json({'status': 'success', 'data': data})
        })
        .catch(err => {
            console.log(err)
            res.json({'status': 'failure', 'message': err})
        })
})

module.exports = router