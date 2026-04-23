const express       = require("express");
const dotenv        = require("dotenv");
const cors          = require("cors");
const cookieParser  = require("cookie-parser");
const mongoose      = require("mongoose");
const router        = require("./router/index.js");
const path          = require("path");

dotenv.config({ path: "./config/.env" });
dotenv.config();
const DB_URL = process.env.db;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
// app.use("/", router);
app.use("/api", router);  // it automatically prepend by "/api" to all backend routes

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Correct CORS configuration
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://192.168.10.116:3000', 'http://103.69.170.74:3000'],
//   credentials: true
// }));

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

mongoose.set('strictQuery', false);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start server
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.error("Server error:", err);
    return;
  }
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
