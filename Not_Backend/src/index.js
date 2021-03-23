const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('../routers/AuthRouters')
const Room = require('../routers/Room')
const Group = require('../routers/group')
const Question = require('../routers/question')
const middlewares = require('../middlewares/errors');
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

//Users Routers 
app.use('/auth',auth.singup);
app.use('/auth',auth.signIn);
app.use('/auth',auth.getUser);
app.use('/auth',auth.getAllUsers);
//Rooms Routers 
app.use('/Room',Room.getAllrooms);
app.use('/Room',Room.CreateRoom);
app.use('/Room',Room.UpdateRoom);
app.use('/Room',Room.DeleteRoom);
//Groups Routers 
app.use('/Group',Group.getAllGroups);
app.use('/Group',Group.CreateGroup);
app.use('/Group',Group.UpdateGroup);
app.use('/Group',Group.DeleteGroup);
//Questions Routers 
app.use('/Question',Question.getAllQuestions);
app.use('/Question',Question.CreateQuestion);
app.use('/Question',Question.DeleteQuestion);
app.use('/Question',Question.UpdateQuestion);


app.get('/hello' , (req , res) => {
    res.json({
        message : " ❤ hello To Our First Alan Turing Game ❤" ,
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