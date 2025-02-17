const express = require("express");
const Meal = require("../models/Meal");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.query.filter === "under30") {
      query.cookTime = { $lt: 30 }; 
    } else if (req.query.filter === "over60") {
      query.cookTime = { $gt: 60 }; 
    }

    const meals = await Meal.find(query);
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMeal = new Meal(req.body);
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMeal) return res.status(404).json({ error: "Meal not found" });
    res.json(updatedMeal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
    if (!deletedMeal) return res.status(404).json({ error: "Meal not found" });
    res.json({ message: "Meal removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
