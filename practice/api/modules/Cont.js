const mongoose=require("mongoose")

//schema of contact form 
const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
    },
    msg:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model("Contact",Userschema)