const express = require("express");
const router = express.Router();
const {
  getStats,
  getDailyLikes,
  getDailyViews,
  hitLike,
  addView,
  unlike,
} = require("../db/stats");

/** POST like from user - checked*/
router.post("/like", async function (req, res) {
  try {
    const { post_id, user_id } = req.body;
    const result = await hitLike(post_id, user_id);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

/** DELETE like from post - checked*/
router.delete("/like", async function (req, res) {
  try {
    const { post_id, user_id } = req.body;
    const result = await unlike(post_id, user_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

/** POST view from user - checked*/
router.post("/view", async function (req, res) {
  try {
    const { post_id, user_id } = req.body;
    const result = await addView(post_id, user_id);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

/** GET statistics by user_id - checked*/
router.get("/stats/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const stats = await getStats(id);
    res.send(stats);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

/** GET likes by user_id for the past week - checked*/
router.get("/likes/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const likes = await getDailyLikes(id);
    res.send(likes);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

/** GET views by user_id for the past week - checked*/
router.get("/views/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const views = await getDailyViews(id);
    res.send(views);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

module.exports = router;
