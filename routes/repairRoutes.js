const express = require("express");
const { createRepair,
     getRepairsByCustomer
 } = require("../controllers/repairController");

const router = express.Router();

router.post("/:customerId/repairs", createRepair);
router.get("/:customerId/repairs", getRepairsByCustomer);

module.exports = router;