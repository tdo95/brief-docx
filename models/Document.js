const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, 
  template: {
    type: String,
    required: true,
  },
  lastEdited: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Document", DocumentSchema);
