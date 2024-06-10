const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const restaurantsFun = require("./restaurants");
const cakes = require("./cakes");
const chinese = require("./chinese");
const cocktails = require("./cocktails");
const desserts = require("./desserts");
const pizzas = require("./pizzas");
const vege = require("./vege");

const menu = [...cakes, ...chinese, ...cocktails, ...desserts, ...pizzas, ...vege]



const app = express();
const PORT = process.env.PORT || 8880;
app.use(bodyParser.json());
app.use(cors());

// API endpoints

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
  
  app.get("/menu", (req, res) => {
    res.json(menu);
  });
  
  // get item by name
  
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
  
  // Add a new item
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

// PUT method to update an existing item
app.put("/update/:item/:id", (req, res) => {
  const item = req.params.item.toLowerCase();
  const id = parseInt(req.params.id);

  let itemList;
  switch (item) {
    case "cakes":
      itemList = cakes;
      break;
    case "chinese":
      itemList = chinese;
      break;
    case "cocktails":
      itemList = cocktails;
      break;
    case "desserts":
      itemList = desserts;
      break;
    case "pizzas":
      itemList = pizzas;
      break;
    case "vege":
      itemList = vege;
      break;
    default:
      return res.status(400).json({ message: "Invalid item" });
  }

  const index = itemList.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const updatedItem = {
    ...itemList[index], // Copy existing item
    ...req.body, // Update with new data from request body
  };

  itemList[index] = updatedItem;

  // Update the menu
  menu = [...cakes, ...chinese, ...cocktails, ...desserts, ...pizzas, ...vege];

  res.json(updatedItem);
});


// PUT method to update all items of a specific type
app.put("/update-all/:item", (req, res) => {
  const item = req.params.item.toLowerCase();

  let itemList;
  switch (item) {
    case "cakes":
      itemList = cakes;
      break;
    case "chinese":
      itemList = chinese;
      break;
    case "cocktails":
      itemList = cocktails;
      break;
    case "desserts":
      itemList = desserts;
      break;
    case "pizzas":
      itemList = pizzas;
      break;
    case "vege":
      itemList = vege;
      break;
    default:
      return res.status(400).json({ message: "Invalid item" });
  }

  // Update all items of the specified type
  itemList.forEach((item, index) => {
    itemList[index] = {
      ...item,
      ...req.body, // Update with new data from request body
    };
  });

  // Update the menu
  menu = [...cakes, ...chinese, ...cocktails, ...desserts, ...pizzas, ...vege];

  res.json(itemList); // Return updated items
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
