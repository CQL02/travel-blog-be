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
    "SELECT user_id FROM users WHERE username = ? AND user_password = ?";
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

module.exports = { login, addUser, deleteUser, deleteUserDesc, deleteAll };
