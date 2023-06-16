const {
  getUser,
  checkTakenUsername,
  updatePassword,
  editDetails,
  updateProfile,
  getProfileDetails,
  getProfileReview,
} = require("../models/users");
const { hashPassword } = require("../services/encryption");

async function checkUsername(req, res) {
  try {
    const username = req.params.username;
    const exist = await checkTakenUsername(username);
    res.send(exist);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function putPassword(req, res) {
  try {
    const id = req.params.id;
    const { user_password } = req.body;
    const hashedPassword = await hashPassword(user_password);
    const result = await updatePassword(hashedPassword, id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function putDetails(req, res) {
  try {
    const id = req.params.id;
    const { username, email } = req.body;
    const image = req.file;
    const result = await editDetails(username, email, image, id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function putProfile(req, res) {
  try {
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
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function getProDetails(req, res) {
  try {
    const id = req.params.id;
    const user = await getProfileDetails(id);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function getProReview(req, res) {
  try {
    const id = req.params.id;
    const user = await getProfileReview(id);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function getUserData(req, res) {
  try {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

module.exports = {
  checkUsername,
  putPassword,
  putDetails,
  putProfile,
  getProDetails,
  getProReview,
  getUserData,
};
