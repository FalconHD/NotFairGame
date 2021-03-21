const express = require('express');
const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const router = express.Router();



const singup = router.post('/signup', async (req, res) => {
    const User = req.body;
    UserModel.create(User)
        .then((result) => {
            jwt.sign({ User }, 'secretkey', { expiresIn: '15s' }, (err, token) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.status(200)
                    res.json({
                        result,
                        token
                    })

                }
            });

        }).catch((err) => res.json({
            error: err.message
        }))

})


const signIn = router.post('/signin', async (req, res, next) => {

    const User = await UserModel.findOne({ username: req.body.username });
    if (User) {
        const isMatch = await User.comparePassword(req.body.password, User.password)
            if(isMatch) {
                jwt.sign({ User }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        res.sendStatus(403);
                        console.log(err);
                    } else {
                        res.json({
                            User,
                            token
                        });
                    }
                });
            } else {

                next({
                    message : "Password Invalid Bro 👀👀👀"
                })
            }
        

    } else {
        next({
            message: "Username Invalid bro try again 🐱‍👓 🐱‍🏍"
        })
    }

})

const getAllUsers = router.get('/Users', verifyToken, (req, res, next) => {


    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {

            res.sendStatus(403)
            res.json({
                message: "authrntication failed try to login "
            })

        } else {
            await UserModel.find().sort()
                .then((data) => {
                    res.json({
                        data: data,
                    })
                    res.status(200);

                })

        }

    })
})

const getUser = router.get('/Users/:id', verifyToken, (req, res, next) => {


    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {

            res.sendStatus(403)
            res.json({
                message: "authrntication failed try to login "
            })

        } else {
            const User = await UserModel.findOne({ _id: req.params.id });

                if(User){
                    res.status(200);
                    res.json({
                        User: User,
                    })
                }else{
                    next({
                        message : "User not found bro are you jocking 🤷‍♂️"
                    })
                }
        }

    })
})


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];

        // Set the token

        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}
module.exports = {
    singup,
    signIn,
    getAllUsers,
    getUser
}