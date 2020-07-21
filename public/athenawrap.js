"use strict"
/*
 * Helper function for requests to Amazon Athena ~
 *
 * As abstract as possible to be reused in possible
 * fucture projects.
*/

//  object for defining AWS object with User credentials
const AthenaExpress = require("athena-express"),
    aws = require("aws-sdk")

//  function for requesting Athena service
//  awscred -> user credentials (region, access key, secrect access key)
//  s3 -> the s3 bucket to write results to
//  db -> the glue database to read from
//  request -> the query for Athena
const getAthenaResults = async (awscreds, s3, db, request) => {

    aws.config.update(awscreds)

    const athenaExpressConfig = {
        aws,
        s3,
        db,
        getStats: true
    }

    const athenaExpress = new AthenaExpress(athenaExpressConfig)
    
    try {
        console.log('Please wait for the query to run...')
        let results = await athenaExpress.query(request)
        console.log('Query Complete!')
        return results
    }
    catch (err) {
        return err
    }
}

module.exports.getAthenaResults = getAthenaResults