const express = require('express');
const {FModel} = require('../models/feedback');
const jwt = require('jsonwebtoken');

const router = express.Router();




const newFeedback = router.get('/newMember', verifyToken, (req, res, next) => {


    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403)
            res.json({
                message: "Authentication failed try to login "
            })

        } else {
            await GModel.find().sort().populate('User')
                .then((data) => {
                    res.status(200);
                    res.json({
                        Groups: data,
                    })

                })
        }

    })
})




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
        res.status(403)
        next({
            message: "Forbidden you have to login first bro"
        })
    }

}



module.exports = {
    getAllGroups
}