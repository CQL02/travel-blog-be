var pool = require("./db");

/**
 * function to get all data of selected blog
 * @param {Int} id - post_id
 * @returns selected blog data
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
 * function to add comment
 * @param {Int} post_id
 * @param {Int} user_id
 * @param {Double} comment_rating
 * @param {Text} comment_desc
 * @returns
 */
async function addComment(post_id, user_id, comment_rating, comment_desc) {
  const result = await pool.query(
    "INSERT INTO comments(post_id, user_id, comment_rating, comment_description, comment_time) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);",
    [post_id, user_id, comment_rating, comment_desc]
  );
  return result;
}

/**
 * function to get all comment of one post
 * @param {Int} id - post_id
 * @returns all comments of that selected post
 */
async function getComment(id) {
  const query = `
    SELECT 
      comments.*, 
      users.username
    FROM 
      comments
    INNER JOIN
      users ON comments.user_id = users.user_id
    WHERE
      comment.post_id = ?;
`;
  const [rows] = await pool.query(query, [id]);
  return rows;
}

module.exports = { getPostByID, addComment, getComment };
