const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('../routers/AuthRouters')
const Room = require('../routers/Room')
const middlewares = require('../middlewares/errors');
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use('/auth',auth.singup);
app.use('/auth',auth.signIn);
app.use('/auth',auth.getUser);
app.use('/auth',auth.getAllUsers);
app.use('/Room',Room.getAllrooms);
app.use('/Room',Room.CreateRoom);

app.get('/hello' , (req , res) => {
    res.json({
        message : "hello ❤" ,
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

dbUrl = process.env.MONGO_URI
mongoose.connect(dbUrl ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
    .then((result) => {
        app.listen(process.env.PORT || 5000);
        console.log("app connected");
    })
    .catch((err => {
        console.error(err)
    }))


    

//api key : 81df64ae8891d649c66e065f5daaf83e