var pool = require("./db");
var fs = require("fs");

async function getUser(id) {
  const [row] = await pool.query("SELECT * FROM users WHERE user_id = ? ", [
    id,
  ]);
  return rows;
}

async function addUser(username, password, email) {
  const result = await pool.query(
    "INSERT INTO users (username, user_password, user_email) VALUES (?, ?, ?)",
    [username, password, email]
  );
  return result;
}

async function updatePassword(newPassword, id) {
  const result = await pool.query(
    "UPDATE users SET user_password = ? WHERE user_id = ?",
    [newPassword, id]
  );
  return result;
}

async function deleteUser(id) {
  const result = await pool.query("DELETE FROM users WHERE user_id = ?", [id]);
  return result;
}

async function editImage(image, id) {
  const imageBuffer = await fs.readFile(image.path);
  const result = await pool.query(
    "UPDATE users SET user_image = ? WHERE user_id = ?",
    [imageBuffer, id]
  );
  return result;
}
