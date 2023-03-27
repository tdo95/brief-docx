const mongoose = require("mongoose");
const similarSubDoc = new mongoose.Schema({
  link: {
    source: String,
    url: String
  },
  title: String,
  date: Date
})
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
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  date: {
    type: Date,
  },
  section: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  similarStories: [similarSubDoc]
  
});

module.exports = mongoose.model("Summary", SummarySchema);
