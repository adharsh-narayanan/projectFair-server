//1)import express

const express = require('express')

//import usercontroller

const userController = require('../Controllers/userController')

//import projectController

const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../middleware/jwtMiddleware')

//import multer

const multer=require('../middleware/multerMiddleware')
const multerconfig = require('../middleware/multerMiddleware')

//2)create an object for Routing class
//routing is created with the help of Router() class present in the express module

const router= new express.Router()


//3)set up path

//path for register request..when request comes to this path give control to usercintroller and function register
router.post('/user/register',userController.register)

//path for login

router.post('/user/login',userController.login)

//path for adding project
router.post('/addproject',jwtMiddleware,multerconfig.single('projectImage'),projectController.addProject)

//path to get home page project

router.get('/home-project',projectController.getHomeProject)

//path to get all projects

router.get('/all-projects',jwtMiddleware,projectController.getAllProject)

//path tp get projects with respect to user  

router.get('/user/projects',jwtMiddleware,projectController.getUserProject)

//path to delete a document

router.delete('/user-project/delete/:id',jwtMiddleware,projectController.deleteUserProject)

//path to edit a user project

router.put('/user-project/edit/:projectId',jwtMiddleware,multerconfig.single('projectImage'),projectController.editUserProject)



//path for adding profile data

router.put('/user/edit-profile',jwtMiddleware,multerconfig.single('profile'),userController.updateProfile)


//4 export router

module.exports = router