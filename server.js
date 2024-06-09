const restaurantsFun = require("./restaurants");

const express = require("express");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8880;
app.use(bodyParser.json());

const restaurants = restaurantsFun();


// API endpoints

// Get all restaurants
app.get("/", (req, res) => {
    res.json("Api Is Working successsfully");
  });
  
  app.get("/restaurants", (req, res) => {
    res.json(restaurants);
  });
  
  // Get a specific restaurant by ID
  app.get("/restaurants/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  });
  
  // Get restaurants by name or food name
  app.get("/restaurants/search/:query", (req, res) => {
    let query = req.params.query || "";
    query = query.toLowerCase();
    console.log(query);
    const results = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query)
    );
    res.json(results);
  });
  
  // Get restaurants by category of food
  app.get("/restaurants/food/:category", (req, res) => {
    const category = req.params.category.toLowerCase();
    const results = restaurants.filter((restaurant) =>
      restaurant.foods.some((food) => food.toLowerCase().startsWith(category))
    );
    res.json(results);
  });
  
  // Add a new restaurant
  app.post("/restaurants", (req, res) => {
    const { name, cuisine, rating, foods } = req.body;
    if (!name || !cuisine || !rating || !foods) {
      return res
        .status(400)
        .json({ message: "Name, cuisine, rating, and foods are required" });
    }
    const newRestaurant = {
      id: restaurants.length + 1,
      name,
      cuisine,
      rating,
      foods,
    };
    restaurants.push(newRestaurant);
    res.status(201).json(newRestaurant);
  });
  
  // Update an existing restaurant
  app.put("/restaurants/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurant.name = req.body.name || restaurant.name;
    restaurant.cuisine = req.body.cuisine || restaurant.cuisine;
    restaurant.rating = req.body.rating || restaurant.rating;
    restaurant.foods = req.body.foods || restaurant.foods;
    res.json(restaurant);
  });
  
  // Delete a restaurant
  app.delete("/restaurants/:id", (req, res) => {
    const id = parseInt(req.params.id);
    restaurants = restaurants.filter((restaurant) => restaurant.id !== id);
    res.status(204).send();
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
