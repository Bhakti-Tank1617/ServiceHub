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

const getRepairsByCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;

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

        const repairs = await Repair.find({ customer: customerId });

        res.status(200).json({
            success: true,
            count: repairs.length,
            data: repairs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch customer repairs"
        });
    }
}; 

const getRepairById = async (req, res) => {
    try {
        const { repairId } = req.params;

        if (!mongoose.isValidObjectId(repairId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid repair ID"
            });
        }

        const repair = await Repair.findById(repairId);

        if (!repair) {
            return res.status(404).json({
                success: false,
                message: "Repair not found"
            });
   
        }

        res.status(200).json({
            success: true,
            data: repair
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch repair"
        });
    }
};

const updateRepairStatus = async (req, res) => {
    try {
        const { repairId } = req.params;
        const { status } = req.body;

        if (!mongoose.isValidObjectId(repairId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid repair ID"
            });
        }

        const allowedStatuses = [
            "Received",
            "Diagnosing",
            "In Progress",
            "Ready",
            "Delivered"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid repair status"
            });
        }

        const repair = await Repair.findByIdAndUpdate(
            repairId,
            { status },
            { new: true, runValidators: true }
        );

        if (!repair) {
            return res.status(404).json({
                success: false,
                message: "Repair not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Repair status updated successfully",
            data: repair
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update repair status"
        });
    }
};

const deleteRepair = async (req, res) => {
    try {
        // Get the repair ID from the URL
        const { repairId } = req.params;

        // Check whether the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(repairId)) {
            return res.status(400).json({ message: "Invalid repair ID" });
        }

        // Find the repair and delete it
        const repair = await Repair.findByIdAndDelete(repairId);

        // If no repair was found, return 404
        if (!repair) {
            return res.status(404).json({ 
                message: "Repair not found"
             });
        }

        // Confirm that the repair was deleted
        res.status(200).json({ message: "Repair deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createRepair,
     getRepairsByCustomer,
     getRepairById,
     updateRepairStatus,
     deleteRepair

};