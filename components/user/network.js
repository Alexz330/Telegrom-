const express = require("express");
const response = require('../../network/response')
const router = express.Router();
const controller = require('./controller')

router.post('/', (req, res) => {
    console.log(req.body)
    controller.addUser(req.body.name)

        .then(data => {
            response.success(req, res, data, 201)
        })
        .catch(err => {
            response.error(req, res, "Internal error", 500, err)
        })
})

router.get("/", (req, res) => {
    controller.listUser()
        .then(users => {
        response.success(req, res, users, 200)
    })
        .catch(err => {
            response.error(req, res, "Internal error", 500, err)
        })
})

module.exports = router