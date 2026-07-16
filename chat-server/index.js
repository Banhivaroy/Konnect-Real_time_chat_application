const express = require("express")
const cors = require("cors")
const { Server } = require("socket.io")
const http = require("http")
const mongoose = require("mongoose")
const { first, field } = require("firebase/firestore/pipelines")
require("dotenv").config()
const port = process.env.PORT || 3000
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const strict = require("assert/strict")
const { type } = require("os")
const { nanoid } = require("nanoid")
const { messaging } = require("firebase-admin")

const app = express()
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ekc-nasscom.web.app",
        "https://ekc-nasscom.firebaseapp.com"
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const server = http.createServer(app)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log(err))

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    inviteCode: {
        type: String,
        unique: true
    },
    invitedBy: {
        type: String,
        default: null
    },

})

const User = mongoose.model("user",userSchema)
const io = new Server(server,{
    cors: {
        origin: [
        "http://localhost:5173",
        "https://ekc-nasscom.web.app",
        "https://ekc-nasscom.firebaseapp.com"
    ],
    credentials: true
    }
})

const onlineUsers = {}
io.on("connection" , (socket) => {
    console.log("Someone Entered", socket.id)

    socket.on("join", (username) => {
        onlineUsers[socket.id] = username
        socket.broadcast.emit("user_joined", username)
        console.log(`${username} joined. Online: ${Object.values(onlineUsers)}`)
    })
    socket.on("Send_msg", (data) => {
        io.emit("receive_msg",data)
    })
    socket.on("User_typing", (username) =>{
        socket.broadcast.emit("user_typing",username)
    })
    socket.on("User_discnnect",() =>{
        const username = onlineUsers[socket.id]
        if(username){
            delete onlineUsers[socket.id]
            io.emit("user_left",username)
            console.log(`${username} left`)
        }
    })
})


const generateToken = (userId) => {
    return jwt.sign(
        {userId},
        process.env.JWT_KEY,
        {expiresIn: "7d"}
    )
}
//  ROUTES
app.get("/", async(req,res) => {
    res.send("Konnect backend running on render")
})
app.post("/", async(req, res) => {
    console.log("signup request received" , req.body)
    const { firstname, lastname, username, email, password} = req.body

    try{
        const existingUsername = await User.findOne({ username: username })
    
            if(existingUsername){
            return res.json({success: false , field: "username", message: "username already taken"})
            }
        const existingEmail = await User.findOne({ email: email})
  
            if(existingEmail){
                return res.json({ success: false, field: "email" ,message:"email registered"})
            }
        // SAVE
       const hashedPassword = await bcrypt.hash(
        password,
        10
       )
       const newUser = new User({
        firstName: firstname,
        lastName: lastname,
        username,
        email,
        password:hashedPassword,
        inviteCode: nanoid(10)
       })
       await newUser.save()
       const token = generateToken(newUser._id)
       res.cookie("jwt", token,{
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
       })
        console.log("user id : ", newUser._id)
        res.json({ success: true, userId: newUser._id})
    }
    catch(err){
        console.log("Sign Up error", err)
        res.json({success: false, message: "Something went wrong"})
    }
})
app.post("/login", async (req,res) =>{

    console.log("post/login request received")
    const { email,password} = req.body

    try{
        const user = await User.findOne({ email })
        if(!user){
            return res.json({
                success: false,
                message: "email not registered"
            })
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        )

        if(!validPassword){
            return res.json({
                success: false,
                message: "incorrect password"
            })
        }
        const token = generateToken(user._id)
        res.cookie("jwt",token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            success: true,
            userId: user._id
        })
    }
    catch(err){
        console.log(err)

        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
})



server.listen(port, () => {
    console.log(`Chat server is running at ${port}`)
})