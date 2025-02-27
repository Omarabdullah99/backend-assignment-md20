const express= require('express')
const { CreateUser, testUser, Login, Logout } = require('../controllers/UserController')
const AuthVerification = require('../middleware/AuthVerification.')

const UserRouter= express.Router()

UserRouter.post('/createUser',CreateUser)
UserRouter.post('/login',Login)
UserRouter.get('/testUser',AuthVerification,testUser)
UserRouter.get('/logut',Logout)


module.exports= UserRouter