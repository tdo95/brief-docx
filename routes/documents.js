const express = require("express");
const router = express.Router();
const documentsController = require("../controllers/documents");

//Document Routes - simplified for now
router.get("/", documentsController.getDocuments);
router.get("/template/:name", documentsController.getTemplate);
router.get("/generate/:template", documentsController.generateDoc);
router.post("/new", documentsController.createDocument);

module.exports = router;