const express = require('express');
const router = express.Router();
const Maria = require('../public/mariadb')
const user = require('../models/user')
const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')

/* GET users listing. */
router.post('/login', function(req, res, next) {
    const maria = new Maria.MariaDB()
    let findUser = "select * from `users` where `users`.email = '" +
        req.body.email + "' limit 1"
    maria.query(findUser)
        .then(user => {
            maria.close()
                .then(() => {
                    user = JSON.parse(JSON.stringify(user))
                    user = user[0]
                    console.log('User grabbed...: ', user.username)
                    //console.log('pass to compare...:', req.body.password)
                    //console.log('encrypted pass...:', user.password)
                    bcrypt.compare(req.body.password, user.password)
                        .then(function(result) {
                            if(result == true) {
                                console.log('password valid')
                                //let token = jwt.sign({'id': user.id}, 'supersecret', {'expiresIn': 86400})
                                //res.send({'auth': true, 'token': token, 'user': user})
                                res.send({'auth': true, 'user': user})
                            }
                            else {
                                console.log('password invalid')
                                //res.send({'auth': false, 'token': null, 'user': null})
                                res.send({'auth': false, 'user': null})
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            console.log(err)
            res.send({'status': 'failure', 'message': 'User could not be retrieved'})
        })
})

router.post('/register', function(req, res, next) {
  //  initialize new user instance
    let User = user.User
    User.username = req.body.username
    User.email = req.body.email
    User.zip = req.body.zip

    bcrypt.hash(req.body.password, 10)
        .then(function(hash) {
            User.password = hash
            console.log(User)

            let insertUser = "insert into `users` (`username`, `email`, `zip`, `password`) values ('" +
            User.username + "', '" +
            User.email + "', '" +
            User.zip + "', '" +
            User.password + "');"
  
            console.log('Insert User Query: ', insertUser)
            const maria = new Maria.MariaDB()
            maria.insert(insertUser, User.email)
                .then(() => {
                    console.log('inserted new user successfully')
                    let findUser = "select * from `users` where email = '"
                        + User.email + "' limit 1"
                    console.log(findUser)
                    maria.query(findUser)
                        .then(user => {
                            console.log('User grabbed...:', user)
                            maria.close()
                                .then(() => {
                                    user = JSON.parse(JSON.stringify(user))
                                    user = user[0]  
                                    //let token = jwt.sign({'id': user.id}, 'supersecret', {'expiresIn': 86400})
                                    //res.send({'status': 'success', 'message': 'User successfully inserted', 'auth': true, 'token': token, 'user': user})
                                    res.send({'status': 'success', 'message': 'User successfully inserted', 'auth': true, 'user': user})
                                })
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.send({'status': 'failure', 'message': 'User was not created'})
                })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router