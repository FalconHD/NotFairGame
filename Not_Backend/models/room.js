const mongoose = require('mongoose');
const { model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;


const RoomSchema = new Schema({
    RoomName : {
        type : String,
        required : true,
        unique : true
    } ,
   
    admins : [{
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"  
    }],
    groups : [{
        type : Schema.Types.ObjectId,
        required : true,
        ref : "Group"  
    }],
    feedback : [{
        type : Schema.Types.ObjectId,
        required : true,
        ref : "Feedback"  
    }]
}, { timestamps: true } );




RoomSchema.plugin(uniqueValidator);
const RoomModel = model('Room' , RoomSchema);

module.exports = RoomModel;