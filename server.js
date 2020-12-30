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
          res.render("index.ejs", { cars: results });
        })
        .catch((error) => console.error(error));
      // Note: __dirname is the current directory you're in. Try logging it and see what you get!
      // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
    });

    app.put("/cars", (req, res) => {
      karsCollection
        .findOneAndUpdate(
          {
            brand: req.body.brand,
            model: req.body.model,
            variant: req.body.variant,
          },
          {
            $set: {
              brand: req.body.brand,
              model: req.body.model,
              variant: req.body.variant,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          res.json("success");
        })
        .catch((error) => console.error(error));
    });

    app.put("/cars", (req, res) => {
      console.log(req.body);
    });

    app.post("/cars", (req, res) => {
      karsCollection.find(req.body, (err, foundresults) => {
        if (err) {
          karsCollection
            .insertOne(req.body)
            .then((result) => {
              res.redirect("/");
            })
            .catch((error) => console.error(error));
        } else {
          res.redirect("/");
        }
      });
    });
    app.listen(3000, function () {
      console.log("listening on 3000");
    });
  })
  .catch(console.error);
