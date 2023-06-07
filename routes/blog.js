var express = require("express");
var router = express.Router();
var { getPostByID, addComment, getComment } = require("../db/blog");

/** GET post by ID - checked*/
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const post = await getPostByID(id);
  res.send(post);
});

/** POST comments from user - checked*/
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

/** GET comments by post_id - checked*/
router.get("/comments/:id", async function (req, res) {
  const id = req.params.id;
  const comments = await getComment(id);
  res.send(comments);
});

module.exports = router;
