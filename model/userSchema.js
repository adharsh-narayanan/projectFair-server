//schema for users collection in database

//import mongoose

const mongoose = require('mongoose')

//schema

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    mailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    linkdin:{
        type:String
    },
    github:{
        type:String
    }


})

//model

const users = mongoose.model("users",userSchema)


//export so that controller can use this and  index.js will be able to access this

module.exports = users
