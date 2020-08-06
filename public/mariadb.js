const mysql = require('mysql2')
/*
 *  class for handling data operations on MariaDB backend database
*/
class MariaDB {

    constructor() {
        //  use host supplied by docker-compose, in this case defined as mysql
        //  for testing purposes
        //  make switch to dedicated endpoint when deploying
        this.connection = mysql.createConnection({
            host: 'mysql',
            port: 9003,
            user: 'dbuser',
            password: 'userdbpass',
            database: 'restaurateurmodels'
        })
    }
    
    /*
    *   All methods are asynchronous (Promise based)
    *   when called, need to use then -> catch statement
    */

    //  A helper method for querying a MariaDB database
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err)
                resolve(rows)
            })
        })
    }

    //  A helper method for inserting new rows into a database
    insert(sql, name, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, err => {
                if (err)
                    return reject(err)
                console.log(name + ' inserted into database successfully')
                resolve()
            })
        })
    }

    //  A helper method for deleting existing rows in a database
    delete(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, err => {
                if(err)
                    return reject(err)
                console.log('Entry deleted successfully from database')
                resolve()
            })
        })
    }

    //  Close the connection with the database, this is required after each query
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err)
                resolve()
            })
        })
    }
}

module.exports.MariaDB = MariaDB