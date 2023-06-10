const express = require("express");
const router = express.Router();
const { sendEmail, sendVerificationEmail } = require("../controller/email");

router.post("/send-email", (req, res) => {
  const { subject, text } = req.body;

  sendEmail(subject, text);

  res.json({ message: "Email sent" });
});

router.post("/send-verification-email", (req, res) => {
  const { to } = req.body;

  const code = sendVerificationEmail(to);

  res.json({ code });
});

module.exports = router;
