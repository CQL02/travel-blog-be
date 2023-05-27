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
  addDefaultProfile,
  getProfileDetails,
  getProfileReview,
} = require("../db/users");

const upload = multer({ dest: "uploads/" });

/** GET user by ID - checked*/
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

/** GET user data to login */

router.get("/login/", (req, res) => {
  // let username = req.query.username;
  // let user_password = req.query.user_password;
  // const result = await login(username, user_password);
  let string = req.query.username + " " + req.query.user_password;
  res.json({ name: string });
});

router.get("/", async (req, res) => {
  let string = req.query.username + " " + req.query.user_password;
  res.json({ name: string });
});

/** POST user register account - checked */
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
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/** GET user username whether the username is taken - checked */
router.get("/checkUsername/:username", async function (req, res) {
  const username = req.params.username;
  const exist = await checkTakenUsername(username);
  res.send(exist);
});

/** DELETE user account - checked*/
router.delete("/delete/:id", async function (req, res) {
  const user_id = req.params.id;
  const result = await deleteUser(user_id);
  res.status(200).send(result);
});

/** PUT user new password - checked */
router.put("/updatePassword/:id", async function (req, res) {
  const id = req.params.id;
  const { user_password } = req.body;
  const result = await updatePassword(user_password, id);
  res.status(200).send(result);
});

/** PUT user new image, email and username - checked*/
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

/** PUT user new profile bio - checked*/
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

/** POST user profile as default -checked */
router.post("/createProfile/:id", async function (req, res) {
  const id = req.params.id;
  const result = await addDefaultProfile(id);
  res.status(201).send(result);
});

/** GET user_descriptions by ID - checked*/
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
