const mongoose = require("mongoose");

const IdeasSchema = new mongoose.Schema({
  ideaTitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  ideaProfile: {
    type: String, // store file path or URL
    required: true
  },
  impact: {
    type: String,
    required: true,
    trim: true
  },
  financialReport: {
    type: String, // store file path or URL
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you have a User model
    required: true
  }
});
const IdeaModel = mongoose.model('ideas', IdeasSchema);
module.exports =IdeaModel;