const express = require("express");
const router = express.Router();
const { sendFeedback, sendVeriEmail } = require("../controllers/email");

/** POST feedback and sent it trhough email */
router.post("/send-email", sendFeedback);

router.post("/send-verification-email", sendVeriEmail);

module.exports = router;
