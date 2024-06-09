const restaurantsFun = require("./restaurants");
const cakes = require("./cakes");
const chinese = require("./chinese");
const cocktails = require("./cocktails");
const desserts = require("./desserts");
const pizzas = require("./pizzas");
const vege = require("./vege");

const menu = [...cakes, ...chinese, ...cocktails, ...desserts, ...pizzas, ...vege]

const express = require("express");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8880;
app.use(bodyParser.json());

// API endpoints

// Get all restaurants
app.get("/", (req, res) => {
    res.json("Api Is Working successsfully");
  });
  app.get("/cakes", (req, res) => {
    res.json(cakes);
  });
  app.get("/chinese", (req, res) => {
    res.json(chinese);
  });
  app.get("/cocktails", (req, res) => {
    res.json(cocktails);
  });
  app.get("/desserts", (req, res) => {
    res.json(desserts);
  });
  app.get("/pizzas", (req, res) => {
    res.json(pizzas);
  });
  app.get("/vege", (req, res) => {
    res.json(vege);
  });
  
  // Get restaurants by name or food name
  app.get("/menu/search/:query", (req, res) => {
    let query = req.params.query || "";
    query = query.toLowerCase();
    console.log(query);
    const results = menu.filter(
      (item) =>
        item.name.toLowerCase().includes(query)
    );
    res.json(results);
  });
  
  // Add a new restaurant
  app.post("/items/:item", (req, res) => {
    let item = req.params.itemtoLowerCase();
    const { name, image, price, sizes = {}} = req.body;
    if (!name || !image || !price) {
      return res
        .status(400)
        .json({ message: "Name, image, and price are required" });
    }
    const newItem = {
      id: cakes.length + 1,
      name,
      image,
      price,
      sizes : [sizes],
    };
    switch (item) {
      case "cakes":
        cakes.push(newItem);
        break;
      case "chinese":
        chinese.push(newItem);
        break;
      case "cocktails":
        cocktails.push(newItem);
        break;
      case "desserts":
        desserts.push(newItem);
        break;
      case "pizzas":
        pizzas.push(newItem);
        break;
      case "vege":
        vege.push(newItem);
        break;
      default:
        return res.status(400).json({ message: "Invalid item" });
    }
    menu = [...cakes, ...chinese, ...cocktails, ...desserts, ...pizzas, ...vege]
    res.status(201).json(newItem);
  });



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
