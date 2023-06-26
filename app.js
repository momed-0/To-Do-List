//requiring express and body parser 
const express = require("express");
const bodyParser = require("body-parser");

//require the local date module 
const date = require(__dirname + "/date.js");

const app = express(); //app generated using express

//it is possible to push new items into const array in javascript
//but can't re assign that
const items = [] ;//initialize the new item array
const workItems = [] ;//work list

//tell the app to use ejs (template)
app.set('view engine','ejs');

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
  })); 

  //tell the express to locate static files in public
app.use(express.static("public"));

//add a route on the root
//req -- request by the browser to the server
//res -- response from the server to the browser
app.get("/",function(req,res) {
    //use date module to get current date
     let day = date.getDate();

     //render list.ejs with the current day type (inside views folder)
     res.render("list",{
        listTitle:day,
        newListItems:items
    });

});

//post request for the new task
app.post("/",function(req,res) {

    let item = req.body.newTask; //parse the newTask

    //if it is work list push into work array 
    //and redirect to work route
    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");//where we render the list with workitems
    } 
    else {
        //else push to normal and redirect to root
        items.push(item);
        res.redirect("/");
    }
});

//another route as work
app.get("/work",function(req,res) {
    //render the list page as work
    res.render("list", {
        listTitle: "Work List" ,
        newListItems:workItems
    });
});

//post route for work
//won't get triggered we are always sending the form post
//to root
app.post("/work",function(req,res) {
    let item = req.body.newTask;
    workItems.push(item);
    res.redirect("/work");
});

//listen to PO RT3000
app.listen(3000, function() {
    console.log("Server started at PORT 3000");
});