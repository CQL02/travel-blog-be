var express = require("express");
var router = express.Router();
var multer = require("multer");
var {
  addPost,
  updatePost,
  getPostByID,
  getSearch,
  getPostByCountry,
  getPostByUserID,
  getHomeRecommand,
  getTopHomeRecommand,
} = require("../db/view");

const upload = multer({ dest: "uploads/" });

/** POST post from user - checked*/
router.post("/add", upload.single("image"), async function (req, res) {
  const { user_id, title, description, country } = req.body;
  const image = req.file;
  const result = await addPost(user_id, title, image, description, country);
  res.status(201).send(result);
});

/** PUT post to update post data - checked*/
router.put(
  "/posts/update/:id",
  upload.single("image"),
  async function (req, res) {
    const id = req.params.id;
    const { title, description, country } = req.body;
    const image = req.file;
    const result = await updatePost(title, image, description, country, id);
    res.status(200).send(result);
  }
);

/** GET post by post_id - checked*/
router.get("/post/:id", async function (req, res) {
  const id = req.params.id;
  const post = await getPostByID(id);
  res.send(post);
});

/** GET post by searched title - checked*/
router.get("/post/search/:search", async function (req, res) {
  const search = req.params.search;
  const posts = await getSearch(search);
  res.send(posts);
});

/** GET post by country - checked*/
router.get("/post/country/:country", async function (req, res) {
  const country = req.params.country;
  const posts = await getPostByCountry(country);
  res.send(posts);
});

/** GET post by user_id - checked*/
router.get("/post/user/:id", async function (req, res) {
  const id = req.params.id;
  const posts = await getPostByUserID(id);
  res.send(posts);
});

/** GET home recommand list (2nd to 10th) - checked*/
router.get("/home", async function (req, res) {
  const posts = await getHomeRecommand();
  res.send(posts);
});

/** GET home recommand list (top) - checked*/
router.get("/homeTop", async function (req, res) {
  const post = await getTopHomeRecommand();
  res.send(post);
});

module.exports = router;
