const express = require("express");
const bodyParser = require("body-parser");
var expressValidator = require("express-validator");
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static("public"));

MongoClient.connect("mongodb://localhost:27017/carsDB", {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("kars");
    const karsCollection = db.collection("cars");

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      db.collection("cars")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { cars: results, success: "", danger: "" });
        })
        .catch((error) => console.error(error));
      // Note: __dirname is the current directory you're in. Try logging it and see what you get!
      // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
    });

    app.put("/cars", (req, res) => {
      console.log(req.body);
    });
    app.post("/variant", (req, res) => {
      let ans = karsCollection
        .find({ brand: req.body.brand, model: req.body.model })
        .toArray()
        .then((results) => {
          if (results.length !== 0) {
            karsCollection
              .find({
                brand: req.body.brand,
                model: req.body.model,
                variant: req.body.variant,
              })
              .toArray()
              .then((results) => {
                if (results.length === 0) {
                  karsCollection
                    .insertOne(req.body)
                    .then((result) => {
                      res.render("index.ejs", {
                        cars: results,
                        success: " Added variant succesfully",
                        danger: "",
                      });
                    })
                    .catch((error) => console.error(error));
                } else {
                  res.render("index.ejs", {
                    cars: results,
                    success: "",
                    danger: " already exists",
                  });
                }
              })
              .catch((error) => console.error(error));
          } else {
            res.render("index.ejs", {
              cars: results,
              success: "",
              danger: " Does not found",
            });
          }
        })
        .catch((error) => console.error(error));
    });

    app.post("/model", (req, res) => {
      let ans = karsCollection
        .find({ brand: req.body.brand })
        .toArray()
        .then((results) => {
          if (results.length !== 0) {
            karsCollection
              .find({
                brand: req.body.brand,
                model: req.body.model,
                variant: req.body.variant,
              })
              .toArray()
              .then((results) => {
                if (results.length === 0) {
                  karsCollection
                    .insertOne(req.body)
                    .then((result) => {
                      res.render("index.ejs", {
                        cars: results,
                        success: " Added model succesfully",
                        danger: "",
                      });
                    })
                    .catch((error) => console.error(error));
                } else {
                  res.render("index.ejs", {
                    cars: results,
                    success: "",
                    danger: " Already exists",
                  });
                }
              })
              .catch((error) => console.error(error));
          } else {
            res.render("index.ejs", {
              cars: results,
              success: "",
              danger: " Brand does not found",
            });
          }
        })
        .catch((error) => console.error(error));
    });
    app.post("/brand", (req, res) => {
      let ans = karsCollection
        .find({
          brand: req.body.brand,
          model: req.body.model,
          variant: req.body.variant,
        })
        .toArray()
        .then((results) => {
          if (results.length === 0) {
            karsCollection
              .insertOne(req.body)
              .then((results) => {
                res.render("index.ejs", {
                  cars: results,
                  success: " brand added successfully",
                  danger: "",
                });
              })
              .catch((error) => console.error(error));
          } else {
            res.render("index.ejs", {
              cars: results,
              danger: "  enter correct details",
              success: "",
            });
          }
        })
        .catch((error) => console.error(error));
    });
    app.post("/cars", (req, res) => {
      karsCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
    app.post("/search", (req, res) => {
      karsCollection
        .find({
          brand: req.body.brand,
          model: req.body.model,
          variant: req.body.variant,
        })
        .toArray()
        .then((results) => {
          if (results.length !== 0) {
            console.log(results);
            res.render("index.ejs", {
              cars: results,
              success: " found successfully",
              danger: "",
            });
          } else {
            res.render("index.ejs", {
              cars: results,
              danger: " not found",
              success: "",
            });
          }
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000, function () {
      console.log("listening on 3000");
    });
  })
  .catch(console.error);
