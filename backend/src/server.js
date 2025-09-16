import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import axios from "axios"
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

// ✅ CORS whitelist
const allowedOrigins = [
  "http://localhost:8080",
  "https://baat-chit-swmr.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }
// for reseting the uptime
const url = "https://baat-chit-chat.onrender.com"
const interval = 30000


function reloadWebsite() {
  axios
    .get(url)
    .then((res) => {
      console.log("Website reloaded");
    })
    .catch((err) => {
      console.log(`Error : ${err.message}`);
    });
}

setInterval(reloadWebsite, interval);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});


app.get("/", (req, res) => {

  res.send("Api is live")

})