# AWS Athena Query Runner
## An API for running queries through Amazon Athena, written in Node.js

### Prerequisites Installed on Host Machine:
  - docker
  - docker-compose
  - git

### To Run:
  - clone this git repository
  - navigate to the root of the cloned repository
  - run **docker-compose up --build athenaquery dbcomponents**

### Test:
  - route: http://yoururl:9002/query
  - json: {
            "awscreds": {
              "region": string,
              "accessKeyId": string,
              "secretAccessKey": string
            },
            "s3": string,
            "db": string,
            "query": string
          }

### For Reference:
  The other included components of this project are being used for a Senior Design Project, where certain routes will handle user logic and application logic. A wrapper for Mariadb is also included, providing functions for querying, inserting, and deleting, as well as creating and closing the connection to the database. 

  All helper functions are built to be asyncronous.

  This project spawns both the Express Node.js API that handles querying athena annd a Mariadb instance with pre-initialized tables ready to handle user and application data. This method would only be recommended for development purposes as this design was implemented to reduce costs and to run both the db instance and the api on the same EC2 t2.micro instance, which falls under the AWS free tier for AWS services.