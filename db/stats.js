var pool = require("./db");

/**
 * function to get the total likes, views and average rating in the past week
 * @param {Int} id - user_id
 * @returns avg_reviews, total_likes, total_views in past week
 */
async function getStats(id) {
  const query = `
    SELECT
      (SELECT AVG(comment_rating) FROM comments WHERE comment_time BETWEEN DATE(NOW()) - INTERVAL 6 DAY AND DATE(NOW()) + INTERVAL 1 DAY AND owner_id = ?) AS avg_reviews,
      (SELECT COUNT(like_time) FROM likes WHERE like_time BETWEEN DATE(NOW()) - INTERVAL 6 DAY AND DATE(NOW()) + INTERVAL 1 DAY AND owner_id = ?) AS total_likes,
      (SELECT COUNT(view_time) FROM views WHERE view_time BETWEEN DATE(NOW()) - INTERVAL 6 DAY AND DATE(NOW()) + INTERVAL 1 DAY AND owner_id = ?) AS total_views;
  `;
  const [rows] = await pool.query(query, [id, id, id]);
  return rows[0];
}

/**
 * function to get total views of each day in past week
 * @param {Int} id - user_id
 * @returns total views and likes of each day in past week
 */
async function getDailyStats(id) {
  const query = `
    SELECT
      DATE_FORMAT(date_table.date, '%d/%m/%Y') AS date,
      COUNT(likes.like_time) AS total_likes,
      COUNT(views.view_time) AS total_views
    FROM 
      (
        SELECT CURDATE() - INTERVAL (days.d + (tens.d * 10) + (hundreds.d * 100)) DAY AS date
        FROM
            (SELECT 0 AS d UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7) AS days,
            (SELECT 0 AS d UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) AS tens,
            (SELECT 0 AS d UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) AS hundreds
      ) AS date_table
    LEFT JOIN likes ON DATE(likes.like_time) = date_table.date AND likes.owner_id = ?
    LEFT JOIN views ON DATE(views.view_time) = date_table.date AND views.owner_id = ?
    WHERE
        date_table.date BETWEEN DATE(NOW()) - INTERVAL 6 DAY AND DATE(NOW())
    GROUP BY
        date_table.date
    ORDER BY
        date_table.date ASC;
  `;
  const [rows] = await pool.query(query, [id, id]);
  return rows;
}

/**
 * function to add like for the post
 * @param {Int} post_id
 * @param {Int} user_id
 * @param {Int} owner_id - post's owner id
 * @returns
 */
async function hitLike(post_id, user_id, owner_id) {
  const result = await pool.query(
    "INSERT INTO likes(post_id, user_id, like_time, owner_id) VALUES (?, ?, CURRENT_TIMESTAMP, ?)",
    [post_id, user_id, owner_id]
  );
  return result;
}

/**
 * function to add view for the post
 * @param {Int} post_id
 * @param {Int} user_id
 * @param {Int} owner_id - post's owner id
 * @returns
 */
async function addView(post_id, user_id, owner_id) {
  const result = await pool.query(
    "INSERT INTO views(post_id, user_id, view_time, owner_id) VALUES (?, ?, CURRENT_TIMESTAMP, ?);",
    [post_id, user_id, owner_id]
  );
  return result;
}

/**
 * function to unlike a post
 * @param {Int} post_id
 * @param {Int} user_id
 * @returns
 */
async function unlike(post_id, user_id) {
  const result = await pool.query(
    "DELETE FROM likes WHERE post_id = ? AND user_id = ?",
    [post_id, user_id]
  );
  return result;
}

module.exports = {
  getStats,
  getDailyStats,
  hitLike,
  addView,
  unlike,
};
