const express = require('express');
const RoomModel = require('../models/room');
const jwt = require('jsonwebtoken');

const router = express.Router();


const CreateRoom = router.post('/Create', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {


            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            const Room = req.body;
            RoomModel.create(Room).then((result) => {
                // res.sendStatus(200)
                res.status(200).json(
                    result
                )
            }).catch((err) => res.status(500).json({
                error: err.message
            }))

        }

    })


})

const UpdateRoom = router.put('/Update/:id', verifyToken, async (req, res ,next) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Authentication failed try to login "
            })

        } else {
            RoomModel.updateOne({_id : req.params.id}, req.body, { new: true }, (err, newRoomInfo) => {
                if (err) next(err)
                res.status(200)
                res.json({
                    newRoomInfo
                })
            })
        }

    })


})


const getAllrooms = router.get('/', verifyToken, (req, res, next) => {


    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {

            res.status(403)
            res.json({
                message: "authrntication failed try to login "
            })

        } else {
            await RoomModel.find().sort().populate('admins')
                .then((data) => {
                    res.status(200);
                    res.json({
                        rooms: data,
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
    getAllrooms,
    CreateRoom
}