var pool = require("./db");
var fs = require("fs");

/**
 * function to create post
 * @param {Int} user_id
 * @param {String} title
 * @param {Blob} image
 * @param {String} description
 * @param {String} country
 * @returns
 */
async function addPost(user_id, title, image, description, country) {
  const imageBuffer = await fs.readFile(image.path);
  const result = await pool.query(
    "INSERT INTO posts (user_id, post_title, post_image, post_description, post_country, post_time) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
    [user_id, title, imageBuffer, description, country]
  );
  return result;
}

/**
 * function to update post
 * @param {String} title
 * @param {Blob} image
 * @param {String} description
 * @param {String} country
 * @param {Int} id - post_id
 * @returns
 */
async function updatePost(title, image, description, country, id) {
  const imageBuffer = await fs.readFile(image.path);
  const result = await pool.query(
    "UPDATE posts SET post_title = ?, post_image = ?, post_description = ?, post_country = ? WHERE post_id = ?",
    [title, imageBuffer, description, country, id]
  );
  return result;
}

/**
 * function to get all data of selected blog
 * @param {Int} id - post_id
 */
async function getPostByID(id) {
  const query = `
    SELECT
      p.*,
      u.username,
      u.user_image,
      COALESCE(l.total_likes, 0) AS total_likes,
      COALESCE(v.total_views, 0) AS total_views,
      COALESCE(c.average_rating, 0) AS average_rating
    FROM
      posts p
    INNER JOIN
      users u ON p.user_id = u.user_id
    LEFT JOIN
      (SELECT post_id, COUNT(likes_time) AS total_likes FROM likes GROUP BY post_id) l ON p.post_id = l.post_id
    LEFT JOIN
      (SELECT post_id, COUNT(view_time) AS total_views FROM views GROUP BY post_id) v ON p.post_id = v.post_id
    LEFT JOIN
      (SELECT post_id, AVG(comment_rating) AS average_rating FROM comments GROUP BY post_id) c ON p.post_id = c.post_id
    WHERE
      p.post_id = ?;
  `;
  const [row] = await pool.query(query, [id]);
  return row;
}

/**
 * function to search post by title (for search bar use)
 * @param {String} search - post title to search
 * @returns all post title contain the word "{search}"
 */
async function getSearch(search) {
  const query = `
    SELECT
      p.*,
      u.username,
      COALESCE(l.total_likes, 0) AS total_likes,
      COALESCE(v.total_views, 0) AS total_views,
      COALESCE(c.average_rating, 0) AS average_rating
    FROM
      posts p
    INNER JOIN
      users u ON p.user_id = u.user_id
    LEFT JOIN
      (SELECT post_id, COUNT(likes_time) AS total_likes FROM likes GROUP BY post_id) l ON p.post_id = l.post_id
    LEFT JOIN
      (SELECT post_id, COUNT(view_time) AS total_views FROM views GROUP BY post_id) v ON p.post_id = v.post_id
    LEFT JOIN
      (SELECT post_id, AVG(comment_rating) AS average_rating FROM comments GROUP BY post_id) c ON p.post_id = c.post_id
    WHERE
      p.post_title LIKE '%?%';
  `;
  const [rows] = await pool.query(query, [search]);
  return rows;
}

/**
 * function to search the post that under the same country (for country page use)
 * @param {String} country
 * @returns all post that have same country
 */
async function getPostByCountry(country) {
  const query = `
    SELECT
      p.*,
      u.username,
      COALESCE(l.total_likes, 0) AS total_likes,
      COALESCE(v.total_views, 0) AS total_views,
      COALESCE(c.average_rating, 0) AS average_rating
    FROM
      posts p
    INNER JOIN
      users u ON p.user_id = u.user_id
    LEFT JOIN
      (SELECT post_id, COUNT(likes_time) AS total_likes FROM likes GROUP BY post_id) l ON p.post_id = l.post_id
    LEFT JOIN
      (SELECT post_id, COUNT(view_time) AS total_views FROM views GROUP BY post_id) v ON p.post_id = v.post_id
    LEFT JOIN
      (SELECT post_id, AVG(comment_rating) AS average_rating FROM comments GROUP BY post_id) c ON p.post_id = c.post_id
    WHERE
      p.post_country = ?;
  `;
  const [rows] = await pool.query(query, [country]);
  return rows;
}

/**
 * function to get all post that post by the user (for myblog use)
 * @param {Int} id - user_id
 * @returns all post from user
 */
async function getPostByUserID(id) {
  const query = `
    SELECT
      p.*,
      u.username,
      COALESCE(l.total_likes, 0) AS total_likes,
      COALESCE(v.total_views, 0) AS total_views,
      COALESCE(c.average_rating, 0) AS average_rating
    FROM
      posts p
    INNER JOIN
      users u ON p.user_id = u.user_id
    LEFT JOIN
      (SELECT post_id, COUNT(likes_time) AS total_likes FROM likes GROUP BY post_id) l ON p.post_id = l.post_id
    LEFT JOIN
      (SELECT post_id, COUNT(view_time) AS total_views FROM views GROUP BY post_id) v ON p.post_id = v.post_id
    LEFT JOIN
      (SELECT post_id, AVG(comment_rating) AS average_rating FROM comments GROUP BY post_id) c ON p.post_id = c.post_id
    WHERE
      p.user_id = ?;
  `;
  const [rows] = await pool.query(query, [id]);
  return rows;
}

/**
 * function to get 2nd to 10th top view post data (for homepage use)
 * @returns 2nd to 10th top view post data
 */
async function getHomeRecommand() {
  const query = `
    SELECT
      p.*,
      u.username,
      COALESCE(l.total_likes, 0) AS total_likes,
      COALESCE(v.total_views, 0) AS total_views,
      COALESCE(c.average_rating, 0) AS average_rating
    FROM
      posts p
    INNER JOIN
      users u ON p.user_id = u.user_id
    LEFT JOIN
      (SELECT post_id, COUNT(likes_time) AS total_likes FROM likes GROUP BY post_id) l ON p.post_id = l.post_id
    LEFT JOIN
      (SELECT post_id, COUNT(view_time) AS total_views FROM views GROUP BY post_id) v ON p.post_id = v.post_id
    LEFT JOIN
      (SELECT post_id, AVG(comment_rating) AS average_rating FROM comments GROUP BY post_id) c ON p.post_id = c.post_id
    ORDER BY
      total_views DESC
    LIMIT 9 OFFSET 1;
  `;
  const [rows] = await pool.query(query);
  return rows;
}

/**
 * function to get top view post data (for homepage use)
 * @returns top view post data
 */
async function getTopHomeRecommand() {
  const query = `
    SELECT
      p.*,
      u.username,
      COALESCE(l.total_likes, 0) AS total_likes,
      COALESCE(v.total_views, 0) AS total_views,
      COALESCE(c.average_rating, 0) AS average_rating
    FROM
      posts p
    INNER JOIN
      users u ON p.user_id = u.user_id
    LEFT JOIN
      (SELECT post_id, COUNT(likes_time) AS total_likes FROM likes GROUP BY post_id) l ON p.post_id = l.post_id
    LEFT JOIN
      (SELECT post_id, COUNT(view_time) AS total_views FROM views GROUP BY post_id) v ON p.post_id = v.post_id
    LEFT JOIN
      (SELECT post_id, AVG(comment_rating) AS average_rating FROM comments GROUP BY post_id) c ON p.post_id = c.post_id
    ORDER BY
      total_views DESC
    LIMIT 1;
  `;
  const [rows] = await pool.query(query);
  return rows;
}

module.exports = {
  addPost,
  updatePost,
  getPostByID,
  getSearch,
  getPostByCountry,
  getPostByUserID,
  getHomeRecommand,
  getTopHomeRecommand,
};
