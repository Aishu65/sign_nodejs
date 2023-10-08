const express = require('express')
const router = express.Router()
const Cont = require("../modules/Cont")
const { body, validationResult } = require("express-validator")

//api creation Contact api
router.post('/',
    [body("name", "please enter valid name").exists(),
    body("email", "Please Enter Valid Email").isEmail(),
    body("msg", "please Enter only Selected Type").exists(),],
    async (req, res) => {
        
        const result = validationResult(req)
        
        try {

            const cont = new Cont({
                name: req.body.name,
                email: req.body.email,
                msg: req.body.msg,
            });
             await cont.save()
            res.status(201).render("contact")
            
        } catch (error) {
            console.error(error.message)
            res.status(500).send("some error occures")
        }

    })

module.exports = router