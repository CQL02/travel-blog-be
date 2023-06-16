const express = require("express");
const router = express.Router();
const {
  addLike,
  delLike,
  viewed,
  getStatistic,
  getDailyStatistic,
  checkLike,
  checkView,
} = require("../controllers/stats");

/** POST like from user - checked*/
router.post("/like", addLike);

/** DELETE like from post - checked*/
router.delete("/like", delLike);

/** POST view from user - checked*/
router.post("/view", viewed);

/** GET statistics by owner_id - checked*/
router.get("/stats/:id", getStatistic);

/** GET likes by owner_id for the past week - checked*/
router.get("/dailyStats/:id", getDailyStatistic);

/** GET whether the user liked the post*/
router.get("/checkLike", checkLike);

/** GET whether the user liked the post*/
router.get("/checkView", checkView);

module.exports = router;
