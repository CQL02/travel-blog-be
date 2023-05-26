var express = require("express");
var router = express.Router();
var { getPostByID, addComment, getComment } = require("../db/blog");

/** GET post by ID */
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const post = await getPostByID(id);
  res.send(post);
});

/** POST comments from user */
router.post("/comment", async function (req, res) {
  const { post_id, user_id, comment_rating, comment_desc } = req.body;
  const result = await addComment(
    post_id,
    user_id,
    comment_rating,
    comment_desc
  );
  res.status(201).send(result);
});

/** GET comments by post_id */
router.get("/comments/:id", async function (req, res) {
  const id = req.params.id;
  const comments = await getComment(id);
  res.send(comments);
});

module.exports = router;
