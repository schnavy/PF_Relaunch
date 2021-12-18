const express = require("express");
const ejs = require("ejs");

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://david:cameraraw@dw.afb8c.mongodb.net/Portfolio?retryWrites=true&w=majority";


  const monk = require("monk");
  const db = monk(uri);
  

const app = express();
app.set("view engine", "ejs");
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(function (req, res, next) {
	req.db = db;
	next();
  });
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {

	var db = req.db;

	var collection = db.get("projekte");
  
	let activeWork = [];
	
	collection.find({},  { sort: { id: 1 } }, function (e, docs) {
	  docs.forEach(e => {
		if(e.isActive){
		  activeWork.push(e);
		}
	  });
	console.log(activeWork);
  
	  res.render("index.ejs", {
		work: activeWork,
		title: "Arbeiten",
	  });
	});


});


app.listen(process.env.PORT || 8000, (req, res) => {
	console.log("running on port 8000");
});
