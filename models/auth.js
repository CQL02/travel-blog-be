const pool = require("../config/dbConfig");
const fs = require("fs").promises;
const { comparePasswords } = require("../services/encryption");

/**
 * Function to check correct username and password
 * @param {String} username - username user key in
 * @param {String} password - password user key in
 * @returns user_id
 */
async function login(username, user_password) {
  const query = "SELECT user_id, user_password FROM users WHERE username = ?";
  const [result] = await pool.query(query, [username]);

  if (result.length === 0) {
    return result;
  }

  const hashedPassword = result[0].user_password;
  const match = await comparePasswords(user_password, hashedPassword);

  return match
    ? [{ user_id: result[0].user_id, user_password: user_password }]
    : [];
}

/**
 * Function to check correct username and password
 * @param {String} username - username user key in
 * @param {String} email - email user key in
 * @returns user_id
 */
async function usernameEmailCheck(username, email) {
  const query =
    "SELECT user_id FROM users WHERE username = ? AND user_email = ?";
  const [result] = await pool.query(query, [username, email]);
  return result;
}

/**
 * function to register new user account
 * @param {String} username
 * @param {Blob} image
 * @param {String} password
 * @param {String} email
 */
async function addUser(username, image, password, email) {
  const imageBuffer = await fs.readFile(image.path);
  const [result] = await pool.query(
    "INSERT INTO users (username, user_image, user_password, user_email) VALUES (?, ?, ?, ?)",
    [username, imageBuffer, password, email]
  );
  return { ...result, user_id: result.insertId };
}

/**
 * function to delete the user's account
 * @param {Int} id - user_id
 * @returns
 */
async function deleteUser(id) {
  const result = await pool.query("DELETE FROM users WHERE user_id = ?", [id]);
  return result;
}

/**
 * function to delete the user's description
 * @param {Int} id - user_id
 * @returns
 */
async function deleteUserDesc(id) {
  const result = await pool.query(
    "DELETE FROM user_descriptions WHERE user_id = ?",
    [id]
  );
  return result;
}

async function deleteAll(user_id) {
  try {
    await pool.query("DELETE FROM posts WHERE user_id = ?", [user_id]);
    await pool.query("DELETE FROM likes WHERE user_id = ?", [user_id]);
    await pool.query("DELETE FROM comments WHERE user_id = ?", [user_id]);
    await pool.query("DELETE FROM views WHERE user_id = ?", [user_id]);

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Error deleting user" };
  }
}

module.exports = {
  login,
  usernameEmailCheck,
  addUser,
  deleteUser,
  deleteUserDesc,
  deleteAll,
};
