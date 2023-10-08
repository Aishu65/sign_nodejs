require('dotenv').config()
const connecttomongo=require("./modules/db")
const express=require("express")
const app=express()
const path =require("path")
const port = process.env.PORT || 8000
const veri = require("./middleware/veri")
const cors=require("cors")
app.use(cors())

const cookie = require('cookie-parser');
app.use(cookie());


app.use(express.json())
app.use(express.urlencoded({extended:false}))


//declare static path for public folder
const staticpath=path.join(__dirname,"../public")
app.use(express.static(staticpath))
app.set("view engine","hbs")

//import/require path for registration , login , contact form 
app.use("/registration",require("./routes/auth"))
app.use("/login",require("./routes/login"))
app.use("/contact",require("./routes/contact"))


//here we redirecting the pages
app.get("/",(req,res)=>{
     res.render("login")
})

app.get("/index",(req,res)=>{
    res.render("index")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/registration",(req,res)=>{
    res.render("registration")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/chatbot",(req,res)=>{
    res.render("chatbot")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/history",(req,res)=>{
    res.render("history")
})

app.get("/learn",(req,res)=>{
    res.render("learn")
})

app.get("/quiz",(req,res)=>{
    res.render("quiz")
})

app.get("/relation",(req,res)=>{
    res.render("relation")
})

app.get("/sign",veri,(req,res)=>{
    // console.log(`this is the cookie ${req.cookies.jwt}`)
    res.render("sign")
})

app.get("/logout", veri , (req,res) => {
    try{
        console.log(req.user)
        res.clearCookie("jwt")
        console.log("logout successfully")

        req.user.save()
        res.render("login")
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.get("/types",(req,res)=>{
    res.render("types")
})


//if page not found 
app.use((req,res)=>{
    res.status(404).json({
        error:'bad request'
    })
})


app.listen(port,console.log('listening'))

connecttomongo()