const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    heading:{
        type:String,
        min:6,
        required:true
    },
    article:{
        type:String,
        min:6,
        required:true
    },
    date:{
        type:String,
        default:Date.now
    }

});

module.exports = mongoose.model("Blog", blogSchema);    