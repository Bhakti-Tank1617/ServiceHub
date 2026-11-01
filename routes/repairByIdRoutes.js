const express = require("express");
const { getRepairById,
    updateRepairStatus,
    deleteRepair,
    assignTechnician
 } = require("../controllers/repairController");

const router = express.Router();

router.get("/:repairId", getRepairById);
router.patch("/:repairId/status", updateRepairStatus);
router.delete("/:repairId",deleteRepair)
router.patch("/:repairId/technician", assignTechnician);

module.exports = router;