const express = require("express");

const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));


let items = [];
let workItems = [];


app.get("/", function (req, res) {


    res.render("list", {
        listTitle: date.getDay(),
        listOfItems: items
    });

});

app.get("/work",function(req, res) {
    res.render("list",{
        listTitle: "Work List",
        listOfItems: workItems
    });
});


app.post("/", function (req, res) {
    let item = req.body.newItem;
    console.log(req.body);

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/about", function(req, res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});