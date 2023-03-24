const express = require("express");
const router = express.Router();
const summariesController = require("../controllers/summaries");

//Summaries Routes 
router.post("/new", summariesController.createSummary);
router.put("/update", summariesController.updateSummary);
router.delete("/delete/:docId/:summaryId", summariesController.deleteSummary);
router.get("/:docId", summariesController.getDocumentSummaries);

//SimilarItems routes
router.post("/similar/new", summariesController.addSimilar);
router.put("/similar/update", summariesController.updateSimilar);
router.delete("/similar/delete/:similarId/:summaryId/:docId", summariesController.deleteSimilar);

module.exports = router;