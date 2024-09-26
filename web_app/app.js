const express = require("express");
const app = express();
const path =require("path");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req,res)=>{
    res.render("home");
    console.log("A request has come!");
});

app.get("/search", (req,res) =>{
    res.render("form");
});

app.get("/student", (req, res) =>{
    const {id} = req.query;
    console.log(req.query);
    res.send(`<h2>Results for ${id}</h2>`);
});

app.get("/:word", (req,res)=>{
    const {word} =req.params;
    res.render("home",{word});
})





app.listen(8080, ()=>{
    console.log("Listening on port 8080");
});