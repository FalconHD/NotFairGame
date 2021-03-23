const mongoose = require('mongoose');
const { model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;


const QSchema = new Schema({
    Question : {
        type : String,
        required : true,
        unique : true
    } ,
   
    category : {
        type : String,
        required : true,
    },
    ascker : [{
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"  
    }],
}, { timestamps: true } );




QSchema.plugin(uniqueValidator);
const QModel = model('Question' , QSchema);

module.exports = QModel;