const {
  addPost,
  updatePost,
  deletePost,
  getPostByID,
  getSearch,
  getPostByCountry,
  getPostByUserID,
  getHomeRecommand,
  getTopHomeRecommand,
} = require("../models/view");

async function createPost(req, res) {
  try {
    const { user_id, title, description, country } = req.body;
    const image = req.file;
    const result = await addPost(user_id, title, image, description, country);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function putPost(req, res) {
  try {
    const id = req.params.id;
    const { title, description, country } = req.body;
    const image = req.file;
    const result = await updatePost(title, image, description, country, id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function delPost(req, res) {
  try {
    const id = req.params.id;
    const result = await deletePost(id);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function searchPostSearch(req, res) {
  try {
    const search = req.params.search;
    const posts = await getSearch(search);
    res.send(posts);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function searchPostCountry(req, res) {
  try {
    const country = req.params.country;
    const posts = await getPostByCountry(country);
    res.send(posts);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function searchPostUser(req, res) {
  try {
    const id = req.params.id;
    const posts = await getPostByUserID(id);
    res.send(posts);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function getHome(req, res) {
  try {
    const posts = await getHomeRecommand();
    res.send(posts);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function getHomeTop(req, res) {
  try {
    const post = await getTopHomeRecommand();
    res.send(post);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}
async function getPostPostID(req, res) {
  try {
    const id = req.params.id;
    const post = await getPostByID(id);
    res.send(post);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

module.exports = {
  createPost,
  putPost,
  delPost,
  searchPostSearch,
  searchPostCountry,
  searchPostUser,
  getHome,
  getHomeTop,
  getPostPostID,
};
