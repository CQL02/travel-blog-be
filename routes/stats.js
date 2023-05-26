var express = require("express");
var router = express.Router();
var {
  getStats,
  getDailyLikes,
  getDailyViews,
  hitLike,
  addView,
} = require("../db/stats");

/** GET statistics by user_id */
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const stats = await getStats(id);
  res.send(stats);
});

/** GET likes by user_id for past week*/
router.get("/likes/:id", async function (req, res) {
  const id = req.params.id;
  const likes = await getDailyLikes(id);
  res.send(likes);
});

/** GET views by user_id for past week*/
router.get("/views/:id", async function (req, res) {
  const id = req.params.id;
  const views = await getDailyViews(id);
  res.send(views);
});

/** POST like from user */
router.post("/like", async function (req, res) {
  const { post_id, user_id } = req.body;
  const result = await hitLike(post_id, user_id);
  res.status(201).send(result);
});

/** POST view from user */
router.post("/view", async function (req, res) {
  const { post_id, user_id } = req.body;
  const result = await addView(post_id, user_id);
  res.status(201).send(result);
});

module.exports = router;
