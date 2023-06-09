var express = require("express");
var router = express.Router();
var {
  getPostByID,
  addComment,
  getComment,
  deleteComment,
} = require("../db/blog");

/** GET post by ID */
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const post = await getPostByID(id);
  res.send(post);
});

/** POST comments from user*/
router.post("/comment", async function (req, res) {
  const { post_id, user_id, comment_rating, comment_desc, owner_id } = req.body;
  const result = await addComment(
    post_id,
    user_id,
    comment_rating,
    comment_desc,
    owner_id
  );
  res.status(201).send(result);
});

/** GET comments by post_id */
router.get("/comments/:id", async function (req, res) {
  const id = req.params.id;
  const comments = await getComment(id);
  res.send(comments);
});

/** DELETE comments by comment_id */
router.delete("/delComment/:id", async function (req, res) {
  const id = req.params.id;
  const comment = await deleteComment(id);
  res.send(comment);
});

module.exports = router;
