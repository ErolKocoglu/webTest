const express = require("express");
const app = express();

app.get("/", (req,res)=>{
    res.send("<h1> Welcome to the home page</h1>");
    console.log("A request has come!");
})

app.listen(8080, ()=>{
    console.log("Listening on port 8080");
})