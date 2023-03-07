let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

getDataFromLocalStorage(); //[1]

//Get From Local [1]
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    arrayOfTasks = tasks;
    addElementsToPageFrom(tasks);
  }
}
//We distributed existing & New Elements [2].
function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
  //added to project recently
  if (tasksDiv.children.length !== 0) {
    let deleteall = document.createElement("span");
    deleteall.className = "delAll";
    deleteall.appendChild(document.createTextNode("DeleteAll"));
    tasksDiv.appendChild(deleteall);
  }
}

//Add Task [3]
submit.onclick = () => {
  if (input.value !== "") {
    addTaskToArr(input.value);
    input.value = "";
  }
};

//Create the New Elements [4]
function addTaskToArr(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  //Time to Add Data to Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

//Add to Local
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

//if we click on one of the tasks
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deleteTasksWith(e.target.parentElement.getAttribute("data-id"));
    //added to project recently
    if (tasksDiv.children[0].className == "delAll") {
      tasksDiv.children[0].remove();
    }
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
  }
  //added to project recently
  if (e.target.classList.contains("delAll")) {
    deleteAllTasks();
  }
});

function deleteTasksWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks); //Update Local
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks); //Update Local
}

//added to project recently
function deleteAllTasks() {
  tasksDiv.innerHTML = "";
  arrayOfTasks = [];
  addDataToLocalStorageFrom(arrayOfTasks);
  window.localStorage.removeItem("tasks");
}

document.onkeyup = function (e) {
  if (e.key == "Enter") {
    submit.click();
  }
};
