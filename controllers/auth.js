const { hashPassword } = require("../services/encryption");
const {
  addUser,
  login,
  usernameEmailCheck,
  deleteUser,
  deleteUserDesc,
  deleteAll,
} = require("../models/auth");
const { addDefaultProfile } = require("../models/users");

async function registerUser(req, res) {
  const { username, user_password, user_email } = req.body;
  const user_image = req.file;
  const hashedPassword = await hashPassword(user_password);
  try {
    const result = await addUser(
      username,
      user_image,
      hashedPassword,
      user_email
    );
    const id = result.user_id;
    await addDefaultProfile(id);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function loginUser(req, res) {
  try {
    const { username, user_password } = req.body;
    const result = await login(username, user_password);
    res.send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function delUser(req, res) {
  try {
    const user_id = req.params.id;
    const result = await deleteUser(user_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function delUserDesc(req, res) {
  try {
    const user_id = req.params.id;
    const result = await deleteUserDesc(user_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function delUserAbt(req, res) {
  try {
    const user_id = req.params.id;
    const result = await deleteAll(user_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function checkEmailUsername(req, res) {
  try {
    const { username, user_email } = req.body;
    const result = await usernameEmailCheck(username, user_email);
    res.send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
  delUser,
  delUserDesc,
  delUserAbt,
  checkEmailUsername,
};
