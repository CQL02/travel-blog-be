const transporter = require("./transporter");

const sendEmail = (subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const generateVerificationCode = () => {
  // Generate a random 6-digit verification code
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = (to) => {
  const verificationCode = generateVerificationCode();

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "[FORGET PASSWORD] Verification Code - TRAVEL NOW",
    text: `Your verification code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  return verificationCode;
};

module.exports = { sendEmail, sendVerificationEmail };
