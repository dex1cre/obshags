express = require "express"
bodyParser = require "body-parser"
sqlite3 = require("sqlite3").verbose()
db = new sqlite3.Database("some.db")
app = express()

app.use bodyParser.urlencoded extended: true
app.use bodyParser.json()

app.disable "x-powered-by"

app.use express["static"] __dirname + "/public"
app.set "view engine", "pug"

app.get "/", (req, res) ->
	db.serialize ->
		db.all "SELECT * FROM backet", (err, row) ->
			if err
				console.log err
				res.send "have not data"
			else
				res.render "admin",
					data: row 

app.post "/delete", (req, res) ->
	db.serialize ->
		db.run "DELETE FROM backet WHERE id=$id",
			$id: req.body.id
			, (err) ->
				if err
					console.log err
					res.json
						data: err
				else
					res.json
						data: "Okay"

app.listen 4646, ->
	console.log "Server listen even 4646 port"