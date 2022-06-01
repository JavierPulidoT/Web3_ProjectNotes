const taskForm = document.querySelector('#taskForm');

//Ejecutar cuando ya se hay acargado todo
//Cuando pase el evento DOMContent...
document.addEventListener("DOMContentLoaded", () => {
    App.init() // estaba antes en App
})

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

        App.createTask(taskForm["title"].value, taskForm["description"].value);
});