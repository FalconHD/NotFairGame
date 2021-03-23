const mongoose = require('mongoose');
const { model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const Schema = mongoose.Schema;


const GroupSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    } ,
   
    logo : {
        type : String
    },
    
    member : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
    }],
    leader : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    }
}, { timestamps: true } );




GroupSchema.plugin(uniqueValidator);
const GModel = model('Group' , GroupSchema);

module.exports = GModel;