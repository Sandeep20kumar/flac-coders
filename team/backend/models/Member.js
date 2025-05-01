const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String }, // store the filename
});

module.exports = mongoose.model("Member", memberSchema);
