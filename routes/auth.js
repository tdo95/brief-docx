const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

//Auth Routes - simplified for now
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

//Test route 
router.get("/api/customers", (req, res) => res.json({customers: ['Justin', 'Mark', 'Julia', 'Olufemi', 'Rashaad', 'Edgar'], user: req.user}))

module.exports = router;
