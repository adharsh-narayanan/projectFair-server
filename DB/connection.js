//connecting server and database 

//1)import mongoose

const mongoose = require("mongoose")

const connectionString = process.env.DATABASE

//2)CONNECT

mongoose.connect(connectionString).then(()=>{
    console.log('mongoose connected successfully');
}).catch((error)=>{
    console.log(error);
})