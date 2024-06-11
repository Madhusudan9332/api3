const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const restaurants = require("./restaurants");
const foodData = require("./data/data.json");

const app = express();
const PORT = process.env.PORT || 8880;
app.use(bodyParser.json());
app.use(cors());

// API endpoints

app.get("/", (req, res) => {
  res.json("Api Is Working successsfully");
});
app.get("/restaurants", (req, res) => {
  res.json(restaurants);
});
app.get("/foodData", (req, res) => {
  res.json(foodData);
});
app.get("/foodData/search/:query", (req, res) => {
  const query = req.params.query.toLowerCase();
  const filteredFoodData = foodData.filter((food) =>
    food.name.toLowerCase().includes(query)
  );
  res.json(filteredFoodData);
});
// get item by name

// Add a new item
app.post("/items/:itemName", (req, res) => {
  let itemName = req.params.itemName.toLowerCase();
  const index = foodData.findIndex((item) => item.name === itemName);
  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  const { name, image, price, isVeg } = req.body;
  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ message: "Name, image, and price are required" });
  }
  const newItem = {
    id: cakes.length + 1,
    name,
    price,
    image,
    ...req.body,
  };
  if (isVeg) {
    foodData[index].data["vegetarian"].push(newItem);
  } else {
    foodData[index].data["non vegetarian"].push(newItem);
  }
  res.status(201).json(newItem);
  res.json(foodData[index]);
});

// PUT method to update all items of a specific type
app.put("/update-id/:itemName", (req, res) => {
  let itemName = req.params.itemName.toLowerCase();
  const index = foodData.findIndex((item) => item.name === itemName);
  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  foodData[index].data["vegetarian"] = foodData[index].data["vegetarian"].map((vegItem, vegIndex) => {
    return { ...vegItem, id: vegIndex + 1 };
  });
  foodData[index].data["non vegetarian"] = foodData[index].data["non vegetarian"].map((nonVegItem, nonVegIndex) => {
    return { ...nonVegItem, id: nonVegIndex + 1 };
  });
  res.json(foodData[index]);

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
