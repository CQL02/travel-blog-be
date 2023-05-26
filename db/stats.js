var pool = require("./db");

/**
 * function to get the total likes, views and average rating in the past week
 * @param {Int} id - user_id
 * @returns avg_reviews, total_likes, total_views in past week
 */
async function getStats(id) {
  const query = `
    SELECT
      (SELECT AVG(comment_rating) FROM comments WHERE comment_time BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() AND user_id = ?) AS avg_reviews,
      (SELECT COUNT(like_time) FROM likes WHERE like_time BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() AND user_id = ?) AS total_likes,
      (SELECT COUNT(view_time) FROM views WHERE view_time BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() AND user_id = ?) AS total_views;
  `;
  const [rows] = await pool.query(query, [id, id, id]);
  return rows[0];
}

/**
 * function to get total likes of each day in past week
 * @param {Int} id - user_id
 * @returns total likes of each day in past week
 */
async function getDailyLikes(id) {
  const query = `
    SELECT
      DATE(like_time) AS date,
      COUNT(like_time) AS total_likes
    FROM 
      likes
    WHERE
      like_time BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
      AND user_id = ?
    GROUP BY
      DATE(like_time);
  `;
  const [rows] = await pool.query(query, [id]);
  return rows;
}

/**
 * function to get total views of each day in past week
 * @param {Int} id - user_id
 * @returns total views of each day in past week
 */
async function getDailyViews(id) {
  const query = `
    SELECT
      DATE(view_time) AS date,
      COUNT(ciew_time) AS total_views
    FROM 
      views
    WHERE
      view_time BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
      AND user_id = ?
    GROUP BY
      DATE(view_time);
  `;
  const [rows] = await pool.query(query, [id]);
  return rows;
}

/**
 * function to add like for the post
 * @param {Int} post_id
 * @param {Int} user_id
 * @returns
 */
async function hitLike(post_id, user_id) {
  const result = await pool.query(
    "INSERT INTO likes(post_id, user_id, like_time) VALUES (?, ?, CURRENT_TIMESTAMP);",
    [post_id, user_id]
  );
  return result;
}

/**
 * function to add view for the post
 * @param {Int} post_id
 * @param {Int} user_id
 * @returns
 */
async function addView(post_id, user_id) {
  const result = await pool.query(
    "INSERT INTO views(post_id, user_id, view_time) VALUES (?, ?, CURRENT_TIMESTAMP);",
    [post_id, user_id]
  );
  return result;
}

module.exports = {
  getStats,
  getDailyLikes,
  getDailyViews,
  hitLike,
  addView,
};
