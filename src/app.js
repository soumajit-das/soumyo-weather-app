// Packages -------------------------
const express = require("express");
const path = require("path");
const hbs = require("hbs");
// ----------------------------------

const app = new express(); // Instance of Express.JS
const port = process.env.PORT || 8000; // Port

// Paths -----------------------------------------------------------
const publicStaticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// -----------------------------------------------------------------

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticPath));

// Home Routing
app.get("/", (req, res) => {
  res.render("index");
});

// Weather Routing
app.get("/weather", (req, res) => {
  res.render("weather");
});

// About Routing
app.get("/about", (req, res) => {
  res.render("about");
});

// Error 404
app.get("*", (req, res) => {
  res.render("error", {
    errorMsg: "Oops! Page Not Found.",
  });
});

// Server
app.listen(port, () => {
  console.log(`Listening to the port ${port}...`);
});
