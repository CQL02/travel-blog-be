const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  registerUser,
  loginUser,
  delUser,
  delUserDesc,
  delUserAbt,
  checkEmailUsername,
} = require("../controllers/auth");

const upload = multer({ dest: "uploads/" });

/** POST user register account and create default profile */
router.post("/register", upload.single("user_image"), registerUser);

/** DELETE user account */
router.delete("/delete/:id", delUser);

/** DELETE user account */
router.delete("/deleteDesc/:id", delUserDesc);

/** DELETE all that about user */
router.delete("/deleteAll/:id", delUserAbt);

/** POST user data to login */
router.post("/login", loginUser);

/** GET user data to login */
router.post("/check-email-username", checkEmailUsername);

module.exports = router;
