// Generated by CoffeeScript 1.12.3
(function() {
  var app, bodyParser, db, express, sqlite3;

  express = require("express");

  bodyParser = require("body-parser");

  sqlite3 = require("sqlite3").verbose();

  db = new sqlite3.Database("some.db");

  app = express();

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.disable("x-powered-by");

  app.use(express["static"](__dirname + "/public"));

  app.set("view engine", "pug");

  app.get("/", function(req, res) {
    return db.serialize(function() {
      return db.all("SELECT * FROM backet", function(err, row) {
        if (err) {
          console.log(err);
          return res.send("have not data");
        } else {
          return res.render("admin", {
            data: row
          });
        }
      });
    });
  });

  app.post("/delete", function(req, res) {
    return db.serialize(function() {
      return db.run("DELETE FROM backet WHERE id=$id", {
        $id: req.body.id
      }, function(err) {
        if (err) {
          console.log(err);
          return res.json({
            data: err
          });
        } else {
          return res.json({
            data: "Okay"
          });
        }
      });
    });
  });

  app.listen(4646, function() {
    return console.log("Server listen even 4646 port");
  });

}).call(this);
