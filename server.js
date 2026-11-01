const express = require("express");
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes")
const repairRoutes = require("./routes/repairRoutes");
const repairByIdRoutes = require("./routes/repairByIdRoutes");

const app = express();

app.use(express.json())
app.use("/api/customers" , customerRoutes);
app.use("/api/customers", repairRoutes);
app.use("/api/repairs", repairByIdRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the ServiceHub API");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ServiceHub API is healthy",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("ServiceHub server is runnig on port 3000");
    });
  } catch (error) {
    console.log("Server Startup Failed:", error.message);
    process.exit(1);
  }
};

startServer();
