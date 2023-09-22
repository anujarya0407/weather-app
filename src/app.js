const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Anuj M",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Anuj M",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    msg: "lorem ipsum...",
    title: "Help Page",
    name: "Anuj M",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide Address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({ ...forecastData, location });
      });
    }
  );
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "404 Page Not Found.",
  });
});
app.listen(3000, () => {
  console.log("Server is up");
});
