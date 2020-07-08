const express = require('express')
const router = express.Router()

const getresults = require('../public/athenawrap')

router.post('/', (req, res, next) => {
    console.log(req.body)
    console.log('Made it to the location route!')
    
    let query = 'SELECT * FROM covid19enigmadata WHERE "lat" = ' 
        + req.body.lat + ' AND "long" = '
        + req.body.long

    getresults.getCovidLocResults(query)
        .then(data => {
            console.log(data)
            res.json({'status': 'success', 'data': data})
        })
        .catch(err => {
            console.log(err)
            res.json({'status': 'failure', 'message': err})
        })
})

module.exports = router