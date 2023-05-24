var pool = require("./db");
var fs = require("fs");

// view selected blog
async function getPostByID(id) {
  const [row] = pool.query("SELECT * FROM posts WHERE post_id = ?", [id]);
  return row;
}

// create post page
async function addPost(user_id, title, image, description, country) {
  const imageBuffer = await fs.readFile(image.path);
  const result = pool.query(
    "INSERT INTO posts (user_id, post_title, post_image, post_description, post_country, post_time) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
    [user_id, title, imageBuffer, description, country]
  );
  return result;
}

// update post page
async function updatePost(title, image, description, country, id) {
  const imageBuffer = await fs.readFile(image.path);
  const result = pool.query(
    "UPDATE posts SET post_title = ?, post_image = ?, post_description = ?, post_country = ? WHERE post_id = ?",
    [title, imageBuffer, description, country, id]
  );
  return result;
}

// show search blog page
async function getSearch(search) {
  const [rows] = pool.query("SELECT * FROM posts WHERE post_title LIKE '%?%'", [
    search,
  ]);
  return rows;
}

// show searched country page
async function getPostByCountry(country) {
  const [rows] = pool.query("SELECT * FROM posts WHERE post_country = ?", [
    country,
  ]);
  return rows;
}
