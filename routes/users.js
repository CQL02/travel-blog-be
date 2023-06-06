var express = require("express");
var router = express.Router();
var multer = require("multer");
var {
  getUser,
  checkTakenUsername,
  updatePassword,
  editDetails,
  updateProfile,
  addDefaultProfile,
  getProfileDetails,
  getProfileReview,
} = require("../db/users");

const upload = multer({ dest: "uploads/" });

/** GET user username whether the username is taken - checked */
router.get("/checkUsername/:username", async function (req, res) {
  const username = req.params.username;
  const exist = await checkTakenUsername(username);
  res.send(exist);
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

/** GET user by ID - checked*/
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

module.exports = router;
