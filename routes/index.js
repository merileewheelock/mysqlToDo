var express = require('express');
var router = express.Router();

// Import our custom "config" node module. It holds a single object that has our MySQL credentails.
var config = require('../config/config');
// Include the mysql module. We got this via npm.
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.host,
	user: config.userName,
	password: config.password,
	database: config.database
});

// We are now connected after this line
connection.connect();
// Now we can write some awesome queries

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Add a post route "addItem" to handle the form submission
router.post('/addItem',(req,res)=>{
	// res.json(req.body); // all data for any post request goto req.body
	var newTask = req.body.newTask;
	var dueDate = req.body.newTaskDate;
	// We know what they submitted from the form. It comes to this route inside req.body.NAMEOFFIELD.
	// Now we need to insert it into MySQL.
	var insertQuery = "INSERT INTO tasks (taskName, taskDate) VALUES('"+newTask+"','"+dueDate+"')"
	// res.send(insertQuery);
	connection.query(insertQuery, (error, results)=>{
		if (error) throw error;
		res.redirect('/');
	})
});

module.exports = router;
