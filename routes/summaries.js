const express = require("express");
const router = express.Router();
const summariesController = require("../controllers/summaries");

//Summaries Routes 
router.post("/new", summariesController.createSummary);
router.put("/update", summariesController.updateSummary);
router.delete("/delete/:summaryId", summariesController.deleteSummary);
router.get("/:docId", summariesController.getDocumentSummaries);

module.exports = router;