const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({

    context : {
        type : String,
        required: true
    },
    userId : {

        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
       

    },
    like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
})

module.exports = mongoose.model('Tweet',tweetSchema);