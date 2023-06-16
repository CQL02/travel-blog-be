const { sendEmail, sendVerificationEmail } = require("../services/email");

async function sendFeedback(req, res) {
  try {
    const { subject, text } = req.body;
    sendEmail(subject, text);
    res.json({ message: "Email sent" });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function sendVeriEmail(req, res) {
  try {
    const { to } = req.body;
    const code = sendVerificationEmail(to);
    res.json({ code });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

module.exports = { sendFeedback, sendVeriEmail };
