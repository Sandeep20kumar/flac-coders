const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // append extension
  },
});

const upload = multer({ storage: storage });

// POST route to add a new member
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, rollNo, department, email, role } = req.body;
    const image = req.file ? req.file.filename : null;

    const newMember = new Member({
      name,
      rollNo,
      department,
      email,
      role,
      image,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to retrieve all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to retrieve a member by ID
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
