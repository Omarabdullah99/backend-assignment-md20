const express= require('express')
const { testProfile,  CreateAndUpdatePortfolio, DeletePortfolioByUserID, GetAllPortfolio } = require('../controllers/ProfileController')
const AuthVerification = require('../middleware/AuthVerification.')



const PortfolioRouter= express.Router()

PortfolioRouter.get('/testProfile',AuthVerification, testProfile)
PortfolioRouter.post('/createProfile',AuthVerification, CreateAndUpdatePortfolio)
PortfolioRouter.post('/updateProfile',AuthVerification, CreateAndUpdatePortfolio)
PortfolioRouter.delete('/deleteProfile',AuthVerification, DeletePortfolioByUserID)
PortfolioRouter.get("/getAllProfile",AuthVerification,GetAllPortfolio)

module.exports= PortfolioRouter