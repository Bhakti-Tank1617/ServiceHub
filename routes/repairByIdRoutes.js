const express = require("express");
const { getRepairById,
    updateRepairStatus,
    deleteRepair
 } = require("../controllers/repairController");

const router = express.Router();

router.get("/:repairId", getRepairById);
router.patch("/:repairId/status", updateRepairStatus);
router.delete("/:repairId",deleteRepair)

module.exports = router;