//Mongodb connectivity

const mongoose=require("mongoose")

const mongoURI=process.env.mongoconnection

const connecttomongo = ()=>{
    mongoose.connect(mongoURI)
        console.log("connected successfully")
}

module.exports=connecttomongo