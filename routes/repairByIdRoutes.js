const express = require("express");
const { getRepairById,
    updateRepairStatus
 } = require("../controllers/repairController");

const router = express.Router();

router.get("/:repairId", getRepairById);
router.patch("/:repairId/status", updateRepairStatus);

module.exports = router;