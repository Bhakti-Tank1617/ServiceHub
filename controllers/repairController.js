const mongoose = require("mongoose");
const Repair = require("../models/Repair");
const Customer = require("../models/Customer");

const createRepair = async (req, res) => {
    try {
        const { customerId } = req.params;
        const { device, issue } = req.body;

        if (!mongoose.isValidObjectId(customerId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID"
            });
        }

        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        if (
            typeof device !== "string" ||
            !device.trim() ||
            typeof issue !== "string" ||
            !issue.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Device and issue are required"
            });
        }

        const repair = await Repair.create({
            customer: customerId,
            device,
            issue
        });

        res.status(201).json({
            success: true,
            message: "Repair created successfully",
            data: repair
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create repair"
        });
    }
};

module.exports = { createRepair };