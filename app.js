//jshint esversion:6
//ToDo List

const express = require("express");
const bodyParser = require("body-parser");

const app = express ();
const port = process.env.PORT || 3000;

const newTasks = [];
const newTasksWork = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {

    let today = new Date();
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }

    let fullDate = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: fullDate, newItem: newTasks, changeList: "Go to Work List"});

})

app.get("/work", (req, res) => {

    let today = new Date();
    let options = {
        weekday: "long"
    }

    let fullDate = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: fullDate + " - Work List", newItem: newTasksWork, changeList: "Go to Personal List"});

})

app.post("/", (req, res) => {

    if (req.body.changelist === "Go to Work List") {
        res.redirect("/work");
    } else if (req.body.changelist === "Go to Personal List") {
        res.redirect("/");
    }
    
    let newTask = req.body.addTask;

    if (req.body.addtask === "Go to Work List") {
        newTasks.push(newTask);
        res.redirect("/");
    } else if (req.body.addtask === "Go to Personal List") {
        newTasksWork.push(newTask);
        res.redirect("/work");
    }
    
})

app.listen(port, () => {
    console.log("Listening on Port: " + port);
})