const add_button=document.querySelector("#add_button");
const reset_button=document.querySelector("#reset_button");
const courses_div=document.querySelector("#courses");
const result = document.querySelector("#result");
const calculate_button=document.querySelector("#calculate_button");

const grades =["Grade","AA","BA","BB","CB","CC","DC","DD","FF"];

function add_options(select){
    for(let i=0;i<grades.length;i++){
        const option=document.createElement("option");
        option.text=grades[i];
        select.add(option);
    }
}

function letter_grade_to_number(letter){
    switch (letter){
        case 'AA':
            return 4;
        case 'BA':
            return 3.5;
        case 'BB':
            return 3;
        case 'CB':
            return 2.5;
        case 'CC':
            return 2;
        case 'DC':
            return 1.5;
        case 'DD':
            return 1;
        case 'FF':
            return 0;
        default:
            return 0;
    }

}

function calculate(){
    let total=0;
    let num_grade=0;
    let total_credit=0;
    for (let i=0;i<courses_div.children.length;i++){
        const course=courses_div.children[i];
        total_credit+=parseInt(course.children[0].value);
        num_grade=letter_grade_to_number(course.children[1].value);
        total+=num_grade*parseInt(course.children[0].value)
    }
    const average=total/total_credit;
    result.value=average.toFixed(2);
}

calculate_button.addEventListener("click",calculate);

add_button.addEventListener("click", ()=>{
    const course=document.createElement("div");
    const credit=document.createElement("input");
    credit.type="number";
    credit.min="0";
    credit.placeholder="The credit of course";
    const grade=document.createElement("select");
    add_options(grade);
    const remove_button=document.createElement("button");
    const button_content='Remove <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>';
    remove_button.innerHTML=button_content;
    remove_button.classList.add("remove_button");
    remove_button.addEventListener("click", ()=>{
        course.remove();
    })    
    course.append(credit);
    course.append(grade);
    course.append(remove_button);
    courses_div.append(course);
});

reset_button.addEventListener("click", ()=>{
    courses_div.innerHTML="";
    result.value="";
    
})