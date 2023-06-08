var express = require("express");
var router = express.Router();
var multer = require("multer");
var { login, addUser, deleteUser, deleteUserDesc } = require("../db/auth");
var { addDefaultProfile } = require("../db/users");

const upload = multer({ dest: "uploads/" });

/** GET user data to login - checked*/
router.get("/login", async (req, res) => {
  const { username, user_password } = req.query;
  const result = await login(username, user_password);
  res.send(result);
});

/** POST user register account and create default profile - checked */
router.post("/register", upload.single("user_image"), async (req, res) => {
  const { username, user_password, user_email } = req.body;
  const user_image = req.file;
  try {
    const result = await addUser(
      username,
      user_image,
      user_password,
      user_email
    );
    const id = result.user_id;
    await addDefaultProfile(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/** DELETE user account - checked*/
router.delete("/delete/:id", async function (req, res) {
  const user_id = req.params.id;
  const result = await deleteUser(user_id);
  res.status(200).send(result);
});

/** DELETE user account - checked*/
router.delete("/deleteDesc/:id", async function (req, res) {
  const user_id = req.params.id;
  const result = await deleteUserDesc(user_id);
  res.status(200).send(result);
});

module.exports = router;
