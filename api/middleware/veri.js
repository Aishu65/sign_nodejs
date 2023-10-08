const jwt = require("jsonwebtoken")
const User = require("../modules/User")

const veri = async(req,res,next)=>{
    try{
       const token = req.cookies.jwt
       const verifyUser = jwt.verify(token,process.env.secret_key)
       console.log(verifyUser)

       const user = await User.findOne({_tokens : this._tokens})
       console.log(user)

       req.token = token
       req.user = user
       next()
    }
    catch(error){
        res.status(401).send(error)
    }
}

module.exports=veri