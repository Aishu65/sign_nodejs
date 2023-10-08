const express=require('express')
const router=express.Router()
const User=require("../modules/User")
const { body, validationResult } = require("express-validator")
const bcrypt=require("bcryptjs")
const cookie = require('cookie-parser');
router.use(cookie());

//api Creation Login api
router.post('/',
[body("email", "Please Enter Valid Email").isEmail(),
body("password", "Password Should be contain One Capital,One symbolic").isLength({ min: 6 })],
async(req,res)=>{
    
    const result = validationResult(req)
    
    const {email,password}=req.body
    try {
        
        let user =await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(200).json({ error: "This user Is Already Exists" })
        }
        
        const passcom = await bcrypt.compare(password , user.password)
        if(!passcom){
            res.status(200).json({error:"please login with correct credentials"})
        }
        // const data = {
        //     user: {
        //         id: user.email
        //     }
        // }

        // const authtoken = jwt.sign(data, jwt_secret)
        // this.tokens=this.tokens.concat({token:authtoken})
        // await this.save()
        // console.log(authtoken)
        // return token
        // res.send({ authtoken })

        const token=await user.generateAuthToken()
        console.log("token"+token)
            
        res.cookie("jwt",token, {
            expires:new Date(Date.now()+3600000),
            // httpOnly:true
        })
        

        res.status(201).render("index")
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occures")



    }

    
})


module.exports=router