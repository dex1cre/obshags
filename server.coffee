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
	res.render "index"

app.post "/new-tov", (req, res) ->
	if 	(req.body.name != "" &&
			 req.body.count != "" &&
			 req.body.number_home != "" &&
			 req.body.id_of_vk != "")
		db.serialize ->
			db.run "INSERT INTO backet(name, count, number_home, id_of_vk)
				VALUES($name, $count, $number_home, $id_of_vk)",
				$name: req.body.name
				$count: req.body.count
				$number_home: req.body.number_home
				$id_of_vk: req.body.id_of_vk
				, (err) ->
					if err
						console.log err
					else
						console.log req.body.id_of_vk + " add to bd!"
						res.json
							data: "Okay"
	else
		res.json
			data: "=("

app.listen 3000, ->
	console.log "Server start on 3000 port"