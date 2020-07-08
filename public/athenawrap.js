"use strict"

const AthenaExpress = require("athena-express"),
    aws = require("aws-sdk"),
    awsCredentials = {
        region: "us-east-1",
        accessKeyId: "AKIAQZ2N52BJEE4DFKJO",
        secretAccessKey: "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"
    }

const getCovidLocResults = async (request) => {
    aws.config.update(awsCredentials)
    
    const athenaExpressConfig = {
        aws,
        s3: "s3://sirgalloathenaresults",
        db: "gluedb",
        getStats: true
    }

    const athenaExpress = new AthenaExpress(athenaExpressConfig)
    
    try {
        let results = await athenaExpress.query(request)
        console.log(results)
        return results
    }
    catch (err) {
        return err
    }
}

module.exports.getCovidLocResults = getCovidLocResults