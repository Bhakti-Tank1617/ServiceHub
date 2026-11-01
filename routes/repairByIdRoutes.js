const express = require("express");
const { getRepairById } = require("../controllers/repairController");

const router = express.Router();

router.get("/:repairId", getRepairById);

module.exports = router;