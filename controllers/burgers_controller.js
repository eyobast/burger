//Import node packages and other files
var express = require("express");
var burger = require("../models/burger");

//Create express router
var router = express.Router();

//Create route handler for GET '/' request
router.get('/', function(request, response) {
	//Read all burger data from db (using burger model methods)
    burger.all(function(data) {
    	//Store burger data in handlebars object
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        //Send handlebars object to index.handlebars
        //and render (display) index.handlebars
        response.render("index", hbsObject);
    });

});

//Create route handler for POST '/create' request
router.post('/create', function(request, response) {
	//Create new burger in db (column name, value, callback (function))
    burger.create([
        "burger_name"
    ], [
        request.body.burger
    ], function() {
    	//Redirect to GET '/' route handler
        response.redirect("/");
    });
});

//Create route handler for PUT '/:id' request
router.put('/:id', function(request, response) {
	//Define condition to be "id = 1" (for example)
    var condition = "id = " + request.params.id;

    console.log("condition", condition);

    //Update existing burger in db (value you want to change, where (id = 5), callback (function))
    burger.update({
        devoured: true
    }, condition, function() {
    	//Redirect to GET '/' route handler
        response.redirect("/");
    });
});

module.exports = router;