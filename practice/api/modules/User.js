// const { response } = require("express")
const mongoose=require("mongoose")
const jwt = require("jsonwebtoken")
const jwt_secret = process.env.secret_key

//schema for Registration and Login Form
const Userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    dob:{
        type: Date,
    required: true,
    trim: true
    },
    address:{
        type:String,
        required:true

    },
    password: {
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens:[{
        token:{
            type:String,
            requireq:true
        }
    }]
})

Userschema.methods.generateAuthToken = async function(){
    try{
        const data = {
            user: {
                _id: this._id
            }
        }

        const authtoken = jwt.sign(data, jwt_secret)
        this.tokens=this.tokens.concat({token:authtoken})
        await this.save()
        // console.log(authtoken)
        return authtoken

    }
    catch(error){
        res.send("error"+error)
        console.log("error"+error)
    }
}



module.exports=mongoose.model("User",Userschema)