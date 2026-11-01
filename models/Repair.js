const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    device: {
      type: String,
      required: true,
      trim: true,
    },
    issue: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Received", "Diagnosing", "In Progress", "Ready", "Delivered"],
      default: "Received",
    },
    technician: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

const Repair = mongoose.model("Repair", repairSchema);

module.exports = Repair;
