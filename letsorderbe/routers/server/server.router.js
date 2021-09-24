const express = require("express")
const router = express.Router()

//fs import
const serverController = require("../../controllers/serverController");

router.route('/server/register')
    .post(serverController.signup)

router.route('/server/login')
    .post(serverController.login)

module.exports = router