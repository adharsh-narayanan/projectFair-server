//1) import dotenv module
    // loads .env file contents into process.env by default
 
require('dotenv').config()

//2) import express

const express = require('express')

//3) import cors
const cors = require('cors')

//import router

const router = require('./Routing/router')


//import connection file

require('./DB/connection')

//4) create server

const newServer = express()

//5)use cors by server

newServer.use(cors())


//6) convert json format into javascript objects..json method returns a middleware (middleware controls request-response cycle) that can convert json to js object

newServer.use(express.json())

newServer.use(router)

//to get uploaded image
     //1st argument- name by which other applications can use this folder
     //second argument - express.static() : exports that folder

newServer.use('/uploads',express.static('./uploads'))




//7) set port

const PORT = 4004 || process.env

//8)run server

newServer.listen(PORT,()=>{
    console.log('server running successfully');
})



/* //GET request

newServer.get('/',(req,res)=>{
 res.send('<h1 style="color:red">server running succesfully and ready to take request</h1>');
})

//post rerrquest

newServer.post('/',(req,res)=>{
    res.send('post request')
})

//put request

newServer.put('/',(req,res)=>{
    res.send('put request')
}) */