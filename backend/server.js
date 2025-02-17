const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const mealRoutes = require("./routes/mealRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/meals", mealRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Meal Management API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
