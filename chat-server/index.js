const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");

require("dotenv").config();
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const { type } = require("os");
const { nanoid } = require("nanoid");


const User =  require("./User")
const Profile = require("./Profile")


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ekc-nasscom.web.app",
      "https://ekc-nasscom.firebaseapp.com",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// temporary
app.use((req,res,next) =>{
  console.log(`${req.method} ${req.originalUrl}`);
  next();
})

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://ekc-nasscom.web.app",
      "https://ekc-nasscom.firebaseapp.com",
    ],
    credentials: true,
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    onlineUsers[username] = socket.id;

    socket.join(username);

    console.log(`${username} joined room`);
  });

  socket.on("Send_msg", (data) => {
    console.log("Message received:", data);

    const {
      from,
      to,
      text,
      time,
    } = data;

    const message = {
      from,
      to,
      text,
      time,
    };

    // Send to recipient
    io.to(to).emit("receive_msg", message);

    // Also send back to sender
    io.to(from).emit("receive_msg", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const username in onlineUsers) {
      if (onlineUsers[username] === socket.id) {
        delete onlineUsers[username];
        break;
      }
    }
  });
});

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: "7d" });
};
//  ROUTES
app.get("/", async (req, res) => {
  res.send("Konnect backend running on render");
});
app.post("/", async (req, res) => {
  console.log("signup request received", req.body);
  const { firstname, lastname, username, email, password,inviteCode } = req.body;

  try {
    const existingUsername = await User.findOne({ username: username });

    if (existingUsername) {
      return res.json({
        success: false,
        field: "username",
        message: "username already taken",
      });
    }
    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return res.json({
        success: false,
        field: "email",
        message: "email registered",
      });
    }
    // INVITE 
    let invitedBy = null;
    if(inviteCode){
      const inviter = await User.findOne({ inviteCode });
      if(inviter){
        invitedBy = inviter._id;
      }
    }
    // SAVE
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName: firstname,
      lastName: lastname,
      username,
      email,
      password: hashedPassword,
      inviteCode: nanoid(8),
      invitedBy
    });
    await newUser.save();
    const token = generateToken(newUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
   
    res.json({ success: true, userId: newUser._id });
  } catch (err) {
    console.log("Sign Up error", err);
    res.json({ success: false, message: "Something went wrong" });
  }
});
app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {
    console.log("Email received:", email);

    const users = await User.find({});

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "email not registered",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.json({
        success: false,
        message: "incorrect password",
      });
    }
    const token = generateToken(user._id);
    console.log("Token: ", token)
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("Cookie sent !!!!!!!!")
    res.json({
      success: true,
      userId: user._id,
    });
  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.get("/me", async(req,res) => {
  try{
    console.log("cookies received !!!!!!!!!!!!!!!! :",req.cookies)
    const token = req.cookies.jwt
    if(!token){
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      })
    }
    const decoded = jwt.verify(token,process.env.JWT_KEY)

    const user = await User.findById(decoded.userId).select("-password")
    if(!user){
      return res.status(404).json({
        success: false,
        message: "user not found"
      })
    }
      res.json({
        success: true,
        user
      })
    
  }
  catch(err){
    console.log(err.message)
    return res.status(401).json({
      success: false,
      message: "invalid or expired token"
    })

  }
});


app.put("/profile", async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY
    );

    const { bio } = req.body;

    const profile = await Profile.findOneAndUpdate(
      {
        userId: decoded.userId,
      },
      {
        bio: bio || "",
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      profile,
    });

  } catch (err) {
    console.log("Profile save error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to save profile",
    });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY
    );

    const profile = await Profile.findOne({
      userId: decoded.userId,
    });

    if (!profile) {
      return res.json({
        success: true,
        profile: null,
      });
    }

    res.json({
      success: true,
      profile,
    });

  } catch (err) {
    console.log("Profile fetch error:", err);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
});

app.get("/friends", async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const friends = await User.find({
      invitedBy: decoded.userId,
    }).select("-password");

    const profiles = await Profile.find({
      userId: { $in: friends.map((friend) => friend._id) },
    });

    const profileMap = new Map(
      profiles.map((profile) => [
        profile.userId.toString(),
        profile,
      ])
    );

    const formattedFriends = friends.map((friend) => {
      const profile = profileMap.get(friend._id.toString());

      return {
        id: friend._id,
        name: `${friend.firstName} ${friend.lastName}`,
        username: friend.username,
        avatar: profile?.profileImage || null,
        bio: profile?.bio || "",
        online: false,
      };
    });

    res.json({
      success: true,
      friends: formattedFriends,
    });

  } catch (err) {
    console.error("Friends fetch error:", err);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
});

server.listen(port, () => {
  console.log(`Chat server is running at ${port}`);
});
