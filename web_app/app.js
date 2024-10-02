const express = require("express");
const app = express();
const path =require("path");

app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let students = [
    {
        id:1,
        name:"John Doe",
        gpa: 3.90 
    },
    {
        id:2,
        name:"Kit Walker",
        gpa: 3.65
    },
    {
        id:3,
        name:"Jude Martin",
        gpa:3.42
    },
    {
        id:4,
        name: "Will Graham",
        gpa: 2.95
    }

]

app.get("/", (req,res)=>{
    res.render("home");
    console.log("A request has come!");
});

app.get("/search", (req,res) =>{
    res.render("form");
});

app.get("/students", (req, res) =>{
    if(!(Object.keys(req.query).length === 0)){
        const {id} = req.query;
        console.log(req.query);
        res.send(`<h2>Results for ${id}</h2>`);
    }else{
        res.render("students",{students});//for all students
    }
    
});

app.get("/students/new", (req, res) => {// sending form to create a student
    res.render("new_form");

});

app.post("/students", (req,res) => {
    const {name, gpa} =req.body;
    students.push({id:0,name,gpa});
    res.redirect("/students");
});

app.get("/students/:id", (req, res) =>{//for one student
    const {id} =req.params;
    const student = students.find(s => s.id === parseInt(id));
    res.render("student", {student});
});

app.get("/:word", (req,res)=>{
    const {word} =req.params;
    res.render("home",{word});
})





app.listen(8080, ()=>{
    console.log("Listening on port 8080");
});