var pool = require("./db");

async function updateProfile(
  country,
  phone,
  instagram,
  country_travelled,
  yoe,
  skills,
  id
) {
  const result = pool.query(
    "UPDATE user_descriptions SET user_country = ?, user_phone = ?, user_ig = ?, user_country_travelled = ?, user_yoe = ?, user_skills = ? WHERE user_id = ?",
    [country, phone, instagram, country_travelled, yoe, skills, id]
  );
  return result;
}

async function getProfile(id) {
  const [row] = pool.query("SELECT * FROM user_description WHERE user_id = ?", [
    id,
  ]);
  return row;
}

module.exports = { updateProfile, getProfile };
