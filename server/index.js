const express       = require("express");
const dotenv        = require("dotenv");
const cors          = require("cors");
const cookieParser  = require("cookie-parser");
const mongoose      = require("mongoose");
const router        = require("./router/index.js");
const path          = require("path");

dotenv.config({ path: "config/config.env" });
const DB_URL = process.env.db;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Correct CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.10.116:3000', 'http://103.69.170.74:3000'],
  credentials: true
}));

// Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
// app.use("/", router);
app.use("/api", router);  // it automatically prepend by "/api" to all backend routes

// Start server
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.error("Server error:", err);
    return;
  }
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
