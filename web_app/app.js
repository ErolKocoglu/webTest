const express = require("express");
const app = express();
const path =require("path");
const method_override =require("method-override");
const { v4: uuidv4 } = require('uuid');



app.use(express.static(path.join(__dirname, "public")));
app.use(method_override("_method"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let students = [
    {
        id:uuidv4(),
        name:"John Doe",
        gpa: 3.90 
    },
    {
        id:uuidv4(),
        name:"Kit Walker",
        gpa: 3.65
    },
    {
        id:uuidv4(),
        name:"Jude Martin",
        gpa:3.42
    },
    {
        id:uuidv4(),
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

app.post("/students", (req,res) => {//create new student, push it to the array
    const {name, gpa} =req.body;
    students.push({id:uuidv4(),name,gpa});
    res.redirect("/students");
});

app.get("/students/:id", (req, res) =>{//for one student
    const {id} =req.params;
    const student = students.find(s => s.id === id);
    res.render("student", {student});
});

app.get("/students/:id/edit", (req,res) => {//send form to edit student
    const {id} = req.params;
    const student = students.find(s => s.id === id);
    res.render("edit_form", {student});

});

app.patch("/students/:id", (req,res) => {
    const {id} = req.params;
    const student = students.find(s => s.id === id);
    student.gpa =req.body.gpa;
    student.name=req.body.name;
    res.redirect("/students");
});

app.delete("/students/:id", (req,res) => {//delete a student
    const {id} =req.params;
    students = students.filter(s => s.id !==id);
    res.redirect("/students");
});

app.get("/:word", (req,res)=>{
    const {word} =req.params;
    res.render("home",{word});
})





app.listen(8080, ()=>{
    console.log("Listening on port 8080");
});