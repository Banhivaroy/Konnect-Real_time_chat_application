const express = require("express")
const cors = require("cors")
const { Server } = require("socket.io")
const http = require("http")
const PORT = 3000

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors: {origin: "http://localhost:5173/"}
})

const onlineUsers = {}
io.on("connection" , (socket) => {
    console.log("Someone Entered", socket.id)

    socket.on("join", (username) => {
        onlineUsers[socket.id] = username
        socket.broadcast("user_joined", username)
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

server.listen(PORT, () => {
    console.log(`Chat server is running at ${PORT}`)
})