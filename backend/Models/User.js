const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    pic: {

        type : String,
        required : false

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    tweets : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tweet'
    }]

})

module.exports = mongoose.model('User',userSchema);