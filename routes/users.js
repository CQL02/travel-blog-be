var express = require("express");
var router = express.Router();
var multer = require("multer");
var {
  getUser,
  login,
  addUser,
  checkTakenUsername,
  updatePassword,
  editDetails,
  deleteUser,
  updateProfile,
  getProfileDetails,
  getProfileReview,
} = require("../db/users");

const upload = multer({ dest: "uploads/" });

/** GET user by ID */
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

/** GET user data to login */
router.get("/login", async function (req, res) {
  const { username, password } = req.body;
  const exist = await login(username, password);
  res.send(exist);
});

/** POST user register account */
router.post("/register", async function (req, res) {
  const { username, password, email } = req.body;
  const result = await addUser(username, password, email);
  res.status(201).send(result);
});

/** GET user username whether the username is taken */
router.get("/checkUsername", async function (req, res) {
  const { username } = req.body;
  const exist = await checkTakenUsername(username);
  res.send(exist);
});

/** DELETE user account */
router.delete("/delete/:id", async function (req, res) {
  const user_id = req.params.id;
  const result = await deleteUser(user_id);
  res.status(200).send(result);
});

/** PUT user new password */
router.put("/updatePassword/:id", async function (req, res) {
  const id = req.params.id;
  const { newPassword } = req.body;
  const result = await updatePassword(newPassword, id);
  res.status(200).send(result);
});

/** PUT user new image, email and username */
router.put(
  "/updateDetails/:id",
  upload.single("image"),
  async function (req, res) {
    const id = req.params.id;
    const { username, email } = req.body;
    const image = req.file;
    const result = await editDetails(username, email, image, id);
    res.status(200).send(result);
  }
);

/** PUT user new profile bio */
router.put("/updateProfile/:id", async function (req, res) {
  const id = req.params.id;
  const { country, phone, instagram, country_travelled, yoe, skills } =
    req.body;
  const result = await updateProfile(
    country,
    phone,
    instagram,
    country_travelled,
    yoe,
    skills,
    id
  );
  res.status(200).send(result);
});

/** GET user_description by ID */
router.get("/desc/:id", async function (req, res) {
  const id = req.params.id;
  const user = await getProfileDetails(id);
  res.send(user);
});

/** GET user average review */
router.get("/review/:id", async function (req, res) {
  const id = req.params.id;
  const user = await getProfileReview(id);
  res.send(user);
});

module.exports = router;
