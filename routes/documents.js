const express = require("express");
const router = express.Router();
const documentsController = require("../controllers/documents");

//Document Routes - simplified for now
router.get("/", documentsController.getDocuments);
router.post("/new", documentsController.createDocument);

module.exports = router;