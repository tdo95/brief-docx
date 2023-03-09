const express = require("express");
const router = express.Router();
const summariesController = require("../controllers/summaries");

//Summaries Routes 
router.post("/new", summariesController.createSummary);

module.exports = router;