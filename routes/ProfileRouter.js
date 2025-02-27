const express= require('express')
const { testProfile, CreateAndUpdateProfile, DeleteProfileByUserID, GetAllProfile } = require('../controllers/ProfileController')
const AuthVerification = require('../middleware/AuthVerification.')

const ProfileRouter= express.Router()

ProfileRouter.get('/testProfile',AuthVerification, testProfile)
ProfileRouter.post('/createProfile',AuthVerification, CreateAndUpdateProfile)
ProfileRouter.post('/updateProfile',AuthVerification, CreateAndUpdateProfile)
ProfileRouter.delete('/deleteProfile',AuthVerification, DeleteProfileByUserID)
ProfileRouter.get("/getAllProfile",AuthVerification,GetAllProfile)

module.exports= ProfileRouter