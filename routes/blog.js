const express = require("express");
const router = express.Router();
const {
  getPost,
  newComment,
  getAllComment,
  delComment,
} = require("../controllers/blog");

/** GET post by ID */
router.get("/:id", getPost);

/** POST comments from user*/
router.post("/comment", newComment);

/** GET comments by post_id */
router.get("/comments/:id", getAllComment);

/** DELETE comments by comment_id */
router.delete("/delComment/:id", delComment);

module.exports = router;
