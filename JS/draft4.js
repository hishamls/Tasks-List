////////////////////VARIABLES///////////
let inputField = document.querySelector("input");
let addBtn = document.querySelector(".add");
// let tasksList = document.querySelector(".tasks-list"); // YOU CANNOT SELECT 3 ITEMS WITH ONE SELECTOR
let tasksList = document.querySelectorAll(".tasks-list"); //note All // not work also// =[]
let notStartedList = document.querySelector(".notStarted");
let inProgressList = document.querySelector(".inProgress");
let completedList = document.querySelector(".completed");

let emptyNotBtn = document.querySelector(".empty-not"); // not forget . for class
let emptyInPBtn = document.querySelector(".empty-inP");
let emptyCompBtn = document.querySelector(".empty-com");

let tasksArr = [];
////Handel drag targets events/////
//TASKsLIST IS AN ARRAY SO WE NEED TO FOReACH()
tasksList.forEach((uL) => {
  uL.addEventListener("dragenter", dragEnter); // WITHOUT ()
  uL.addEventListener("dragover", dragOver);
  uL.addEventListener("drop", drop);
  uL.addEventListener("dragleave", dragLeave);
});
// console.log(tasksList);

//////////////FUNCTIONS/////////////
addOldDataToPage();

//FIRST GET DATA FROM LOCAL STORAGE
function getDataFromLocalStorage() {
  let oldData = window.localStorage.getItem("Tasks");
  if (oldData) {
    let oldTasks = JSON.parse(oldData);
    // console.log(tasks); // test5
    tasksArr = oldTasks;
    addTasksToPage(tasksArr);
  }
}
//SECOND GET DATA FROM INPUT BUTTON
addBtn.addEventListener("click", () => {
  //3adds
  //1 WORK
  // addBtn.onclick = () => {
  //  WORK
  // addBtn.onclick = function () {
  if (inputField.value !== "") {
    // addTaskToArray(inputField); //
    addNewTaskToArray(inputField.value); //3
    // tasksArr.push(inputField.value);
    //2 inputField = ""; // DON'T FORGET .VALUE
    inputField.value = ""; //test1
  }
});
function addNewTaskToArray(taskText) {
  // 3adds
  const task = {
    //4
    title: taskText,
    ID: Date.now(),
    state: {
      notStarted: true,
      inProgress: false,
      completed: false,
    },
  };
  //5 Push Task To Array Of Tasks
  tasksArr.push(task); // BASE
  // console.log(tasksArr); //test2
  //6 Add Tasks To Page // FIRST
  addTasksToPage(tasksArr); //YOU HAVE TO ADD TO PAGE AFTER EDITING LOCAL STORAGE
  //11 Add Tasks To Local Storage after Editing// SECOND
  addDataToLocalStorageFrom(tasksArr);
}
function addTasksToPage(arr) {
  //7 Empty tasks lists to avoid repeating old tasks
  // tasksList.innerHTML = ""; // YOU CANNOT SELECT 3 ITEMS WITH ONE SELECTOR but SELECTaLL
  notStartedList.innerHTML = "";
  inProgressList.innerHTML = "";
  completedList.innerHTML = "";

  //8 Looping On Array Of Tasks
  tasksArr.forEach((task) => {
    let taskLI = document.createElement("li");
    taskLI.textContent = task.title; //work
    // taskLI.innerText = task.title;

    let taskBox = document.createElement("div");
    taskBox.classList.add("task-box", "draggable");
    taskBox.setAttribute("data-id", task.ID); //10 To Delete whole the box
    taskBox.setAttribute("draggable", "true");
    ////Handel drag targets events/////
    taskBox.addEventListener("dragstart", dragStart);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<ion-icon name="trash-outline" class="icn"></ion-icon> `;
    deleteBtn.className = "delete";
    deleteBtn.addEventListener("click", (e) => {
      //REMOVE ELEMENT FORM LOCAL STORAGE SHOULD FIRSTLY
      let id = taskBox.getAttribute("data-id");
      // let id = e.target.parentElement.getAttribute("data-id"); // that I made li and divBox
      deleteTaskFromTasksArrayAndLocalStorageWith(id);
      //REMOVE ELEMENT FORM PAGE STORAGE SHOULD SECONDLY
      deleteBtn.parentElement.remove(); //work
    });

    let editBtn = document.createElement("button");
    editBtn.innerHTML = ` <ion-icon name="create-outline" class="icn"></ion-icon> `;
    editBtn.className = "edit";
    editBtn.addEventListener("click", (e) => {
      const taskID = taskBox.getAttribute("data-id");
      const taskTitle = taskBox.querySelector("li").textContent;
      const newTitle = prompt("Write the new task title:", taskTitle);

      if (newTitle !== null && newTitle !== "" && newTitle !== taskTitle) {
        const taskToUpdate = tasksArr.find((task) => task.ID == taskID);
        taskToUpdate.title = newTitle;
        addTasksToPage(tasksArr);
        addDataToLocalStorageFrom(tasksArr);
      }
    });

    taskBox.append(taskLI, editBtn, deleteBtn);

    // Check  Task State

    switch (true) {
      case task.state.completed:
        completedList.appendChild(taskBox);
        break;
      case task.state.inProgress:
        inProgressList.appendChild(taskBox);
        break;
      case task.state.notStarted:
        notStartedList.appendChild(taskBox);
        break;
      default:
        console.log("Invalid task state");
    }
  });
}
function addDataToLocalStorageFrom(arr) {
  localStorage.setItem("Tasks", JSON.stringify(arr)); //Tasks
}
function addOldDataToPage() {
  getDataFromLocalStorage();
  // 2 addTasksToPage(arr)
}
//Update: delete and add
function deleteTaskFromTasksArrayAndLocalStorageWith(taskId) {
  tasksArr = tasksArr.filter((task) => task.ID != taskId); // new tasksArr//return any exept tasks = id
  addDataToLocalStorageFrom(tasksArr);
}
emptyNotBtn.onclick = (e) => {
  // First empty the list from local storage
  tasksArr = tasksArr.filter((task) => task.state.notStarted === false);
  addDataToLocalStorageFrom(tasksArr);
  addTasksToPage(tasksArr);
};
emptyInPBtn.addEventListener("click", () => {
  // First empty the list from local storage
  tasksArr = tasksArr.filter((task) => task.state.inProgress === false);
  addDataToLocalStorageFrom(tasksArr);
  // Second empty the list from the page:
  addTasksToPage(tasksArr);
});
emptyCompBtn.addEventListener("click", () => {
  // First empty the list from local storage
  tasksArr = tasksArr.filter((task) => task.state.completed === false);
  addDataToLocalStorageFrom(tasksArr);
  // Second empty the list from the page:
  addTasksToPage(tasksArr);
});
////////DRAG & DROP FUNCTIONS/////////////
// for draggable ele:
////////////////////////////////////////////
function dragStart(e) {
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
  e.dataTransfer.setData("text/plain", e.target.dataset.id);
  console.log(e.target.dataset.id);
}

//////////drop target zone/////////////
////////////////////////////////////
function dragEnter(e) {
  if (e.target.classList.contains("tasks-list")) {
    e.preventDefault();
  }
}
function dragOver(e) {
  if (e.target.classList.contains("tasks-list")) {
    e.preventDefault();
    e.target.classList.add("over");
  }
}
function dragLeave(e) {
  if (e.target.classList.contains("tasks-list")) {
    e.target.classList.remove("over");
    // this.classList.remove("over");
  }
}
function drop(e) {
  if (e.target.classList.contains("tasks-list")) {
    e.preventDefault();
    let id = e.dataTransfer.getData("text/plain");
    let draggable = document.querySelector(`[data-id="${id}"]`); // select by an attribute
    let dropzone = e.target; // HOW I MAKE IT NOT INCLUDE LIST
    dropzone.appendChild(draggable);
    dropzone.classList.remove("over");
    draggable.classList.remove("hide");
    updateArrayAndLocalStorage(id, dropzone);
  }
}

//NEW DATA FROM DRAG AND DROP ON THE PAGE

// function updateArrayAndLocalStorage(id) {
//   switch (true) {
//     case taskBox.parentElement === completedList:
//       task.state.completed;
//       break;
//     case taskBox.parentElement === inProgressList:
//       task.state.inProgress;
//       break;
//     case taskBox.parentElement === notStartedList:
//       task.state.notStarted;
//       break;

//     default:
//       console.log("Invalid Parent List");
//       break;
//   }
//   deleteTaskFromTasksArrayAndLocalStorageWith(id);
//   // addNewTaskToArray();
//   addNewTaskToArray(taskText); // not need
//   // addDataToLocalStorageFrom(arr); // in delete fun.
// }
///////////////////////ai/////////////////
function updateArrayAndLocalStorage(id, dropzone) {
  let taskToUpdate = tasksArr.find((task) => task.ID == id); // find == X filter !=
  switch (dropzone) {
    case completedList:
      taskToUpdate.state.completed = true;
      taskToUpdate.state.inProgress = false;
      taskToUpdate.state.notStarted = false;
      break;
    case inProgressList:
      taskToUpdate.state.completed = false;
      taskToUpdate.state.inProgress = true;
      taskToUpdate.state.notStarted = false;
      break;
    case notStartedList:
      taskToUpdate.state.completed = false;
      taskToUpdate.state.inProgress = false;
      taskToUpdate.state.notStarted = true;
      break;
    default:
      console.log("Invalid Parent List");
      break;
  }
  addDataToLocalStorageFrom(tasksArr);
}
