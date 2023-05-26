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

// let taskBox = document.createElement("div"); // WRITING HERE WILL NOT REPEATING BUT EDITING
// let taskLI = document.createElement("li");
// let deleteBtn = document.createElement("button");
// let editBtn = document.createElement("button");

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
      // deleteBtn.parentNode.innerHTML = ""; //work
      // deleteBtn.parentElement.innerHTML = ""; //  work
      // this.parentElement.innerHTML = ""; // not work
      // e.target.parentElement.remove();
    });

    let editBtn = document.createElement("button");
    editBtn.innerHTML = ` <ion-icon name="create-outline" class="icn"></ion-icon> `;
    editBtn.className = "edit";
    editBtn.addEventListener("click", (e) => {
      // taskInput.edit= true
      // taskLI.innerText = "";
      // // taskLI.innerText = taskLI.value;
      // let editInput = document.createElement("input");
      // editInput.className = "edit-input";
      // editInput.value = taskLI.value;
      // taskBox.appendChild(editInput);
    });

    taskBox.append(taskLI, editBtn, deleteBtn);

    // Check  Task State
    // // if (task.state.notStarted) {
    // if (task.notStarted) {
    //   // taskBox.classList.add("notStarted-task"); //9
    //   notStartedList.appendChild(taskBox);
    // } else if (task.inProgress) {
    //   // taskBox.className = "task-box inProgress-task"; // anther way
    //   inProgressList.appendChild(taskBox);
    // } else {
    //   // taskBox.classList.add("completed-task"); //9
    //   completedList.appendChild(taskBox);
    // }
    //
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
    // state: notStarted,
    state: {
      notStarted: false,
      inProgress: true,
      completed: false,
    },
  };
  //5 Push Task To Array Of Tasks
  tasksArr.push(task); // BASE
  // console.log(tasksArr); //test2
  //6 Add Tasks To Page // FIRST
  addTasksToPage(tasksArr); //YOU HAVE TO ADD TO PAGE AFTER EVERY EDITING LOCAL STORAGE
  //11 Add Tasks To Local Storage after Editing// SECOND
  addDataToLocalStorageFrom(tasksArr);
}

function addOldDataToPage() {
  getDataFromLocalStorage();
  // 2 addTasksToPage(arr)
}

//Update: delete and add
function deleteTaskFromTasksArrayAndLocalStorageWith(taskId) {
  // forEach((ele) => {
  //   console.log(tasksArr[ele]);
  // });
  //FOR EXPLAIN
  // console.log(taskId);
  // for (let i = 0; i < tasksArr.length; i++) {
  //   console.log(`${tasksArr[i].ID} === ${taskId}`);
  // }
  // tasksArr = tasksArr.filter((task) => task.ID != taskId); // new tasksArr
  tasksArr = tasksArr.filter((task) => task.ID !== parseInt(id)); //AI

  addDataToLocalStorageFrom(tasksArr);
}
function addDataToLocalStorageFrom(arr) {
  // console.log(arr);
  // console.log(JSON.stringify(arr)); // test4

  localStorage.setItem("Tasks", JSON.stringify(arr)); //Tasks
}
emptyNotBtn.onclick = (e) => {
  // First empty the list from local storage
  tasksArr = tasksArr.filter((task) => task.state.notStarted === false);
  // console.log(tasksArr);
  addDataToLocalStorageFrom(tasksArr);
  // Second empty the list from the page:
  // notStartedList.innerHTML = "";
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
// ////////DRAG & DROP FUNCTIONS/////////////
// // for draggable ele:
function dragStart(e) {
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);

  // e.transferData.setData("text/plain", "data-id");
  // e.transferData.setData("text/plain", task.ID);
  // e.transferData.setData("text/plain", e.target.ID);
  // e.transferData.setData("text/plain", e.target.data - id);// mistake in writing method name
  // e.dataTransfer.setData("text/plain", e.target["data-id"]);
  e.dataTransfer.setData("text/plain", e.target.dataset.id);
  console.log(e.target.dataset.id);
}
// function drag() {
//   // for draggable ele
// }
// function dragEnd() {
//   // for draggable ele
// }

//////////drop target/////////////
function dragEnter(e) {
  e.preventDefault();
}
function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("over");
}
function dragLeave(e) {
  e.target.classList.remove("over");
  // this.classList.remove("over");
}
function drop(e) {
  // drop means you choose this target zone; it's differ from leave
  e.target.classList.remove("over");
  // let id = e.transferData.getData("text/plain");
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);
  console.log(id);
  console.log(draggable);
  e.target.appendChild(draggable);
  draggable.classList.remove("hide");
  // //REMOVE ELEMENT FORM LOCAL STORAGE  FIRSTLY
  // let id = taskBox.getAttribute("data-id");
  deleteTaskFromTasksArrayAndLocalStorageWith(id);
  addNewTaskToArray(draggable.task.title);
  // //REMOVE ELEMENT FORM PAGE STORAGE SHOULD SECONDLY
  // this.remove();
}
function drop(e) {
  e.preventDefault(); // why? what's useful?
  let id = e.dataTransfer.getData("text/plain");
  let draggable = document.querySelector(`[data-id="${id}"]`); // select by an attribute
  const currentState = tasksArr.find((task) => task.ID === parseInt(id)).state; //AI & NOT USE

  let dropzone = e.target; //problem not working
  dropzone.appendChild(draggable);
  draggable.classList.remove("hide");

  // updateArrayAndLocalStorage();
  updateArrayAndLocalStorage(id, dropzone); //AI
}
// function drop(e) {
//   e.preventDefault();
//   const id = e.dataTransfer.getData("text/plain");
//   const taskBox = document.querySelector(`[data-id="${id}"]`);
//   const currentState = tasksArr.find((task) => task.ID === parseInt(id)).state;

//   if (this.classList.contains("notStarted")) {
//     taskBox.remove();
//     notStartedList.appendChild(taskBox);
//     updateArrayAndLocalStorage(parseInt(id), {
//       notStarted: true,
//       inProgress: false,
//       completed: false,
//     });
//   } else if (this.classList.contains("inProgress")) {
//     taskBox.remove();
//     inProgressList.appendChild(taskBox);
//     updateArrayAndLocalStorage(parseInt(id), {
//       notStarted: false,
//       inProgress: true,
//       completed: false,
//     });
//   } else if (this.classList.contains("completed")) {
//     taskBox.remove();
//     completedList.appendChild(taskBox);
//     updateArrayAndLocalStorage(parseInt(id), {
//       notStarted: false,
//       inProgress: false,
//       completed: true,
//     });
//   }
// }

//////NEW DATA FROM DRAG AND DROP ON THE PAGE/////

// function updateArrayAndLocalStorage(id) {
function updateArrayAndLocalStorage(id, dropzone) {
  // switch (true) {
  //   case taskBox.parentElement === completedList:
  //     task.state.completed;
  //     break;
  //   case taskBox.parentElement === inProgressList:
  //     task.state.inProgress;
  //     break;
  //   case taskBox.parentElement === notStartedList:
  //     task.state.notStarted;
  //     break;

  //   default:
  //     console.log("Invalid Parent List");
  //     break;
  // }
  /////////AI////////
  // const taskBox = document.querySelector(`[data-id="${id}"]`);// NOT USE
  const newTaskState = getNewTaskStateFromDropzone(dropzone);

  const taskToUpdate = tasksArr.find((task) => task.ID == id);
  taskToUpdate.state = newTaskState;

  deleteTaskFromTasksArrayAndLocalStorageWith(id);
  addNewTaskToArray(taskToUpdate.title); //AI
  // addNewTaskToArray();
  // addNewTaskToArray(taskText);// not need

  // addDataToLocalStorageFrom(arr); // in delete fun.
}
function updateArrayAndLocalStorage(id, state) {
  const task = tasksArr.find((task) => task.ID === id);
  task.state = state;
  addDataToLocalStorageFrom(tasksArr);
}
/////////AI/////////////////////
function getNewTaskStateFromDropzone(dropzone) {
  const newTaskState = {
    notStarted: false,
    inProgress: false,
    completed: false,
  };

  switch (dropzone) {
    case notStartedList:
      newTaskState.notStarted = true;
      break;
    case inProgressList:
      newTaskState.inProgress = true;
      break;
    case completedList:
      newTaskState.completed = true;
      break;
    default:
      console.log("Invalid Parent List");
      break;
  }

  return newTaskState;
}
