//schema for projects collection in database

const mongoose = require('mongoose')


//schema

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    }
    ,
    overview:{
        type:String,
        required:true
    },
    projectImage:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    }
}

)


//model

const projectdatas= mongoose.model("projectdatas",projectSchema)


//export

module.exports=projectdatas
