var pool = require("./db");
var fs = require("fs").promises;

/**
 * Function to check correct username and password
 * @param {String} username - username user key in
 * @param {String} password - password user key in
 * @returns 1 will be successfull, 0 will be fail
 */
async function login(username, password) {
  const query =
    "SELECT COUNT(user_id) AS count FROM users WHERE username = ? AND user_password = ?";
  const [result] = await pool.query(query, [username, password]);
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
  const result = await pool.query(
    "INSERT INTO users (username, user_image, user_password, user_email) VALUES (?, ?, ?, ?)",
    [username, imageBuffer, password, email]
  );
  return result;
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

module.exports = { login, addUser, deleteUser };