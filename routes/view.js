const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createPost,
  putPost,
  delPost,
  searchPostSearch,
  searchPostCountry,
  searchPostUser,
  getHome,
  getHomeTop,
  getPostPostID,
} = require("../controllers/view");

const upload = multer({ dest: "uploads/" });

/** POST post from user - checked*/
router.post("/add", upload.single("image"), createPost);

/** PUT post to update post data - checked*/
router.put("/posts/update/:id", upload.single("image"), putPost);

/** DELETE post by post_id */
router.delete("/post/delete/:id", delPost);

/** GET post by searched title - checked*/
router.get("/post/search/:search", searchPostSearch);

/** GET post by country - checked*/
router.get("/post/country/:country", searchPostCountry);

/** GET post by user_id - checked*/
router.get("/post/user/:id", searchPostUser);

/** GET home recommand list (2nd to 10th) - checked*/
router.get("/home", getHome);

/** GET home recommand list (top) - checked*/
router.get("/homeTop", getHomeTop);

/** GET post by post_id - checked*/
router.get("/post/:id", getPostPostID);

module.exports = router;
