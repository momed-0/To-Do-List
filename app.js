//---------Requiring Packages----------------------------------------------
//requiring express and body parser 
const express = require("express");
const bodyParser = require("body-parser");

//mongoose for mongodb
const mongoose = require("mongoose");

const app = express(); //app generated using express

//tell the app to use ejs (template)
app.set('view engine','ejs');

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
  })); 

  //tell the express to locate static files in public
app.use(express.static("public"));

//---------Database SetUp MongoDB----------------------------------------------

//create a database in mongodb

//connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
//create a new schema
const itemSchema =new mongoose.Schema({
    name : String
});
//new mongoose model based on schema
const Item = mongoose.model("Item", itemSchema);

 
const test1 = new Item ( {
    name:"Welcome Human Being!"
});
const test2 = new Item ({
    name : "Go ahead and Hit + to add new Item"
});
const test3 = new Item ({
    name : "Don't forget to remove the elements by checkbox"
});


const defaultItems = [test1,test2,test3];

const listSchema = {
    name:String,
    items:[itemSchema]
};

const List = mongoose.model("List", listSchema);


//---------Route ,Get and Post----------------------------------------------

//add a route on the root
//req -- request by the browser to the server
//res -- response from the server to the browser
app.get("/",function(req,res) {
    

    Item.find({})
      .then(function(foundItems) {

        //create the default items
        if(foundItems.length === 0) {
            Item.insertMany(defaultItems)
                .then(function () {
                    console.log("Successfully saved defult items to DB");
                })
                .catch(function (err) {
                    console.log(err);
                });
                res.redirect("/");
        }else {
             //render list.ejs with the current day type (inside views folder)
            res.render("list",{
                listTitle: "Today",
                newListItems:foundItems
            });
        }
      })
      .catch(function(err) {
        console.log(err);
      });

});

//dynamic new route
app.get("/:customListName",function(req,res) {
    const customListName = req.params.customListName;

    List.findOne({ name:customListName })
    .then(function(foundList) {
        if (!foundList) {
            //create a new List
            const list = new List( {
                name: customListName,
                items:defaultItems
            });
            list.save();
            res.redirect("/" + customListName);
        }
        else {
            //show an existing list
            res.render("list", {
                listTitle: foundList.name,
                newListItems: foundList.items
            });
        }
    })
    .catch(function(err) {
        console.log(err);
      });

});

//post request for the new task
app.post("/",function(req,res) {

    const itemName = req.body.newTask; //parse the newTask
    const listName = req.body.list;

    //create new Mongodb doc
    const item = new Item ( {
        name:itemName
    });

    if(listName === "Today") {
        //save into collections
        item.save();
        res.redirect("/");
    }
    else {
        //custom list
        List.findOne( {
            name : listName
        } )
        .then(function(foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })
        .catch(function(err) {
            console.log(err);
        })
    }

});

app.post("/delete",function(req,res) {
    const checkedItemId = req.body.checkBox;
    Item.findByIdAndRemove(checkedItemId)
        .catch(function(err) {
            console.log(err)
        });
    res.redirect("/");
});






//---------Set Up The Server----------------------------------------------
//listen to PO RT3000
app.listen(3000, function() {
    console.log("Server started at PORT 3000");
});