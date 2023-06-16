const {
  getStats,
  getDailyStats,
  hitLike,
  addView,
  unlike,
  getLike,
  getView,
} = require("../models/stats");

async function addLike(req, res) {
  try {
    const { post_id, user_id, owner_id } = req.body;
    const result = await hitLike(post_id, user_id, owner_id);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function delLike(req, res) {
  try {
    const { post_id, user_id } = req.query;
    const result = await unlike(post_id, user_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function viewed(req, res) {
  try {
    const { post_id, user_id, owner_id } = req.body;
    const result = await addView(post_id, user_id, owner_id);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function getStatistic(req, res) {
  try {
    const id = req.params.id;
    const stats = await getStats(id);
    res.send(stats);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function getDailyStatistic(req, res) {
  try {
    const id = req.params.id;
    const likes = await getDailyStats(id);
    res.send(likes);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function checkLike(req, res) {
  try {
    const { post_id, user_id } = req.query;
    const like = await getLike(post_id, user_id);
    res.send(like[0]);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

async function checkView(req, res) {
  try {
    const { post_id, user_id } = req.query;
    const view = await getView(post_id, user_id);
    res.send(view[0]);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}

module.exports = {
  addLike,
  delLike,
  viewed,
  getStatistic,
  getDailyStatistic,
  checkLike,
  checkView,
};
