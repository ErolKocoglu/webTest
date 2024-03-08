const add_button=document.querySelector("#add_button");
const reset_button=document.querySelector("#reset_button");
const courses_div=document.querySelector("#courses");

add_button.addEventListener("click", ()=>{
    const course=document.createElement("div");
    const credit=document.createElement("input");
    const grade=document.createElement("select");
    credit.type="number";
    course.append(credit);
    course.append(grade);
    courses_div.append(course);
});