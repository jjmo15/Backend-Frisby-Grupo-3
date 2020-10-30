const { request, response } = require("express");
const express = require("express");

const router = express.Router();

const userController = require('../controllers/users.controller');
const offerController= require('../controllers/offer.controller')

router.get("/api/v1/",(request,response)=>{
    response.send("1");
});

router
.get("/api/v1/users", userController.getUsers)

.post('/api/v1/users', userController.saveUsers)

.put('/api/v1/users/:identificacion', userController.updateUsers)

.delete('/api/v1/users/:identificacion', userController.deleteUsers)

.get("/api/v1/offer", offerController.getOffer)

.post('/api/v1/offer', offerController.saveOffer)

.put('/api/v1/offer/:id', offerController.updateOffer)

.delete('/api/v1/offer/:id', offerController.deleteOffer);

module.exports = router;



