const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
	res.render("index.ejs", {
		title: "PF RELAUNCH"
	});
});


app.listen(process.env.PORT || 8000, (req, res) => {
	console.log("running on port 8000");
});
