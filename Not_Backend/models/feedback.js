const mongoose = require('mongoose');
const { model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');





const Schema = mongoose.Schema;


const FeedbackSchema = new Schema({
    feedback : {
        type : Number,
        required : true
    } ,
    
    member : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
    }]
}, { timestamps: true } );




FeedbackSchema.plugin(uniqueValidator);
const FModel = model('Feedback' , GroupSchema);

module.exports = FModel;