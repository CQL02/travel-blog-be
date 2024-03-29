const pool = require("../config/dbConfig");
const fs = require("fs").promises;

/**
 * function to get user details to display (use in blog, bloglist, profile, edit profile)
 * @param {Int} id
 * @returns
 */
async function getUser(id) {
  const [row] = await pool.query("SELECT * FROM users WHERE user_id = ? ", [
    id,
  ]);
  return row;
}

/**
 * function to check whether the username is already taken
 * @param {String} username
 * @returns 1 for yes, 0 for no
 */
async function checkTakenUsername(username) {
  const [count] = await pool.query(
    "SELECT username FROM users WHERE username = ?",
    [username]
  );
  return count;
}

/**
 * function to update password (use in login/forgetpassword and settings/changepassword)
 * @param {String} newPassword
 * @param {Int} id - user_id
 * @returns
 */
async function updatePassword(newPassword, id) {
  const result = await pool.query(
    "UPDATE users SET user_password = ? WHERE user_id = ?",
    [newPassword, id]
  );
  return result;
}

/**
 * function to edit the profile details
 * @param {String} username
 * @param {String} email - user_email
 * @param {Blob} image - user_image
 * @param {Int} id - user_id
 * @returns
 */
async function editDetails(username, email, image, id) {
  const imageBuffer = await fs.readFile(image.path);
  const result = await pool.query(
    "UPDATE users SET username = ?, user_email = ?, user_image = ? WHERE user_id = ?",
    [username, email, imageBuffer, id]
  );
  return result;
}

/**
 * function to update profile details (about part)
 * @param {String} country - country user live in
 * @param {String} phone - phone number of user
 * @param {String} instagram - instagram username of user
 * @param {String} country_travelled - country that travelled before
 * @param {Int} yoe - year of experiences in travelling
 * @param {String} skills - skills that user have
 * @param {Int} id - user_id
 * @returns
 */
async function updateProfile(
  country,
  phone,
  instagram,
  country_travelled,
  yoe,
  skills,
  id
) {
  const result = await pool.query(
    "UPDATE user_descriptions SET user_country = ?, user_phone = ?, user_ig = ?, user_country_travelled = ?, user_yoe = ?, user_skills = ? WHERE user_id = ?",
    [country, phone, instagram, country_travelled, yoe, skills, id]
  );
  return result;
}

/**
 * function to set the default profile
 * @param {Int} id - user_id
 * @returns
 */
async function addDefaultProfile(id) {
  const result = await pool.query(
    "INSERT INTO user_descriptions (user_id, user_country, user_phone, user_ig, user_country_travelled, user_yoe, user_skills) VALUES (?,'-','-','-','-',0,'-')",
    [id]
  );
  return result;
}

/**
 * function to get profile data (about)
 * @param {Int} id - user_id
 * @returns profile data (about) of user
 */
async function getProfileDetails(id) {
  const [row] = await pool.query(
    "SELECT * FROM user_descriptions WHERE user_id = ?",
    [id]
  );
  return row;
}

/**
 * function to get total review of the user
 * @param {Int} id - owner_id
 * @returns
 */
async function getProfileReview(id) {
  const result = await pool.query(
    "SELECT AVG(comment_rating) AS rating FROM comments WHERE owner_id = ?",
    [id]
  );
  return result;
}

module.exports = {
  getUser,
  checkTakenUsername,
  updatePassword,
  editDetails,
  updateProfile,
  addDefaultProfile,
  getProfileDetails,
  getProfileReview,
};
