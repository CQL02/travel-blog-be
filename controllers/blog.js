const {
  getPostByID,
  addComment,
  getComment,
  deleteComment,
} = require("../models/blog");

async function getPost(req, res) {
  try {
    const id = req.params.id;
    const post = await getPostByID(id);
    res.send(post);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function newComment(req, res) {
  try {
    const { post_id, user_id, comment_rating, comment_desc, owner_id } =
      req.body;
    const result = await addComment(
      post_id,
      user_id,
      comment_rating,
      comment_desc,
      owner_id
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function getAllComment(req, res) {
  try {
    const id = req.params.id;
    const comments = await getComment(id);
    res.send(comments);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function delComment(req, res) {
  try {
    const id = req.params.id;
    const comment = await deleteComment(id);
    res.send(comment);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

module.exports = { getPost, newComment, getAllComment, delComment };
