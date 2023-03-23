const express = require("express");
const router = express.Router();
const documentsController = require("../controllers/documents");

//Document Routes - simplified for now
router.get("/:userId", documentsController.getDocuments);
router.post("/new", documentsController.createDocument);
router.put("/update/:docId", documentsController.updateDocument);
router.delete("/delete/:docId", documentsController.deleteDocument);

router.get("/template/:name", documentsController.getTemplate);
router.get("/generate/:template/:docId/:docType", documentsController.generateDocument);


module.exports = router;