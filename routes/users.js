const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  checkUsername,
  putPassword,
  putDetails,
  putProfile,
  getProDetails,
  getProReview,
  getUserData,
} = require("../controllers/users");

const upload = multer({ dest: "uploads/" });

/** GET user username whether the username is taken - checked */
router.get("/checkUsername/:username", checkUsername);

/** PUT user new password - checked */
router.put("/updatePassword/:id", putPassword);

/** PUT user new image, email and username - checked*/
router.put("/updateDetails/:id", upload.single("image"), putDetails);

/** PUT user new profile bio - checked*/
router.put("/updateProfile/:id", upload.none(), putProfile);

/** GET user_descriptions by ID - checked*/
router.get("/desc/:id", getProDetails);

/** GET user average review */
router.get("/review/:id", getProReview);

/** GET user by ID - checked*/
router.get("/:id", getUserData);

module.exports = router;
