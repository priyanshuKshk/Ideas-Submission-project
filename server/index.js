const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use(cors({ origin: '*' }));
const router = express.Router();
const signupLoginRoutes = require("./routes/signupLogin"); // adjust the path if needed
const authMiddleware = require("./middleware/authMiddleware");
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MongoDB URI is not defined. Check your .env file or environment variables.');
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Uploads directory created:", uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

app.use("/uploads", express.static(uploadsDir));

app.use("/", signupLoginRoutes);

const IdeaModel = require("./models/ideas");
const generateToken = require("./utils/generateToken");
app.post(
  "/api/submit-idea",
  authMiddleware,
  upload.fields([
    { name: "ideaProfile", maxCount: 1 },
    { name: "financialReport", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { ideaTitle, description, impact } = req.body;

      const ideaProfile = req.files?.ideaProfile?.[0]
        ? `${req.protocol}://${req.get("host")}/uploads/${
            req.files.ideaProfile[0].filename
          }`
        : "";

      const financialReport = req.files?.financialReport?.[0]
        ? `${req.protocol}://${req.get("host")}/uploads/${
            req.files.financialReport[0].filename
          }`
        : "";

      const submittedBy = req.user._id;

      const newIdea = new IdeaModel({
        ideaTitle,
        description,
        impact,
        ideaProfile,
        financialReport,
        submittedBy,
      });

      const savedIdea = await newIdea.save();

      res
        .status(200)
        .json({ message: "Idea submitted successfully", idea: savedIdea });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).send("Something went wrong");
    }
  }
);
// GET /api/my-ideas
app.get("/api/my-ideas", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find ideas submitted by this user
    const ideas = await IdeaModel.find({ submittedBy: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(ideas);
  } catch (err) {
    console.error("Error fetching ideas:", err);
    res.status(500).json({ message: "Server error fetching ideas" });
  }
});

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
