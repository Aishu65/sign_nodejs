const express=require('express')
const router=express.Router()
const User=require("../modules/User")
const { body, validationResult } = require("express-validator")
const bcrypt=require("bcryptjs")
const cookie = require('cookie-parser');
router.use(cookie());


//api Creation Registration api
router.post('/',
[body("username","please enter valid name").isLength({min:5}),
body("email", "Please Enter Valid Email").isEmail(),
body("phone", "Please Enter Valid Phone number").notEmpty(),
body("dob", "Please Enter Valid DOB").notEmpty(),
body("address", "please Enter only Selected Type").isLength({min:15}),
body("password", "Password Should be contain One Capital,One symbolic").isLength({ min: 6 }),
body("confirmpassword", "Password not matched").custom((value, { req }) => {
    return value === req.body.password;
  })],
async(req,res)=>{
    
    const result = validationResult(req)
    if (result.isEmpty()) {
        return res.send(`Hello, ${req.query.person}!`)
    }
    try {
        
        let user =await User.findOne({ email: req.body.email })
        if (user) {
            res.status(200).json({ error: "This Mail Is Already Exists" })
        }

        const salt = await  bcrypt.genSaltSync(10)
        const hash=await bcrypt.hash(req.body.password,salt)
        const comfirmhash=await bcrypt.hash(req.body.confirmpassword,salt)
    
        const password=req.body.password
        const cpassword=req.body.confirmpassword
        if(password === cpassword){

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                phone:req.body.phone,
                dob:req.body.dob,
                address:req.body.address,
                password: hash,
                confirmpassword:comfirmhash
            });

            
            const token=await user.generateAuthToken()
            console.log("token "+token)

            res.cookie("jwt",token, {
                expires:new Date(Date.now()+3600000),
                httpOnly:true
            })
            console.log(cookie)

            const registered = await user.save()
            res.status(201).render("login",registered)
        }else{
            res.send("password not matched")
        }
        
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occures")



    }

    
})




module.exports=router;