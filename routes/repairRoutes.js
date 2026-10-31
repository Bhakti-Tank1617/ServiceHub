const express = require("express");
const { createRepair } = require("../controllers/repairController");

const router = express.Router();

router.post("/:customerId/repairs", createRepair);

module.exports = router;