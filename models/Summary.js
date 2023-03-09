const mongoose = require("mongoose");

const SummarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  }, 
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("Summary", SummarySchema);
