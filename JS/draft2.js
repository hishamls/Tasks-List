////////////////////VARIABLES///////////
let inputField = document.querySelector("input");
let addBtn = document.querySelector(".add");
// let dropZones = document.querySelector(".tasks-list"); // YOU CANNOT SELECT 3 ITEMS WITH ONE SELECTOR
let dropZones = document.querySelectorAll(".tasks-list"); //note All // not work also// =[]

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
//dropZones IS AN ARRAY SO WE NEED TO FOReACH()
dropZones.forEach((uL) => {
  uL.addEventListener("dragenter", dragEnter); // WITHOUT ()
  uL.addEventListener("dragover", dragOver);
  uL.addEventListener("drop", drop);
  uL.addEventListener("dragleave", dragLeave);
});
// console.log(dropZones);

//////////////FUNCTIONS/////////////
addOldDataToPage();
function addOldDataToPage() {
  getDataFromLocalStorage();
  // 2 addTasksToPage(arr)
}

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
  // dropZones.innerHTML = ""; // YOU CANNOT SELECT 3 ITEMS WITH ONE SELECTOR but SELECTaLL
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
    editBtn.innerHTML = `<ion-icon name="create-outline" class="icn"></ion-icon> `;
    editBtn.className = "edit";
    // editBtn.addEventListener("click", (e) => {
    // taskInput.edit= true
    // taskLI.innerText = "";
    // // taskLI.innerText = taskLI.value;
    // let editInput = document.createElement("input");
    // editInput.className = "edit-input";
    // editInput.value = taskLI.value;
    // taskBox.appendChild(editInput);
    editBtn.addEventListener("click", (e) => {
      // const taskBox = e.target.parentElement.parentElement;// WE'VE ALREADY DEFINED THE TASKbOX

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
////////////////////////////////////
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
function addDataToLocalStorageFrom(arr) {
  // console.log(arr);
  // console.log(JSON.stringify(arr)); // test4

  localStorage.setItem("Tasks", JSON.stringify(arr)); //Tasks
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
  tasksArr = tasksArr.filter((task) => task.ID != taskId); // new tasksArr
  addDataToLocalStorageFrom(tasksArr);
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
////////DRAG & DROP FUNCTIONS/////////////
// for draggable ele:
////////////////////////////////////////////
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
// function drop(e) {
//   // drop means you choose this target zone; it's differ from leave
//   e.target.classList.remove("over");
//   // let id = e.transferData.getData("text/plain");
//   const id = e.dataTransfer.getData("text/plain");
//   const draggable = document.getElementById(id);
//   console.log(id);
//   console.log(draggable);
//   e.target.appendChild(draggable);
//   draggable.classList.remove("hide");
//   // //REMOVE ELEMENT FORM LOCAL STORAGE  FIRSTLY
//   // let id = taskBox.getAttribute("data-id");
//   deleteTaskFromTasksArrayAndLocalStorageWith(id);
//   addNewTaskToArray(draggable.task.title);
//   // //REMOVE ELEMENT FORM PAGE STORAGE SHOULD SECONDLY
//   // this.remove();
// }
function drop(e) {
  if (e.target.classList.contains("tasks-list")) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.querySelector(`[data-id="${id}"]`); // select by an attribute
    const dropzone = e.target; // HOW I MAKE IT NOT INCLUDE LIST
    dropzone.appendChild(draggable);
    dropzone.classList.remove("over");
    draggable.classList.remove("hide");
    // updateArrayAndLocalStorage(id);
  }
}

//NEW DATA FROM DRAG AND DROP ON THE PAGE

function updateArrayAndLocalStorage(id) {
  deleteTaskFromTasksArrayAndLocalStorageWith(id);

  let taskBox = document.querySelector(`[data-id="${id}"]`);
  switch (true) {
    case taskBox.parentElement === completedList:
      tasksArr.forEach((task) => {
        if (task.ID == id) {
          task.state.completed = true;
          task.state.inProgress = false;
          task.state.notStarted = false;
        }
      });
      break;
    case taskBox.parentElement === inProgressList:
      tasksArr.forEach((task) => {
        if (task.ID == id) {
          task.state.completed = false;
          task.state.inProgress = true;
          task.state.notStarted = false;
        }
      });
      break;
    case taskBox.parentElement === notStartedList:
      tasksArr.forEach((task) => {
        if (task.ID == id) {
          task.state.completed = false;
          task.state.inProgress = false;
          task.state.notStarted = true;
        }
      });
      break;

    default:
      console.log("Invalid Parent List");
      break;
  }
  addNewTaskToArray(taskBox.textContent);
  // const taskToUpdate = tasksArr.find((task) => task.ID == id);
  // tasksArr.push(taskToUpdate); // BASE
  // addDataToLocalStorageFrom(tasksArr);
  // const task = {
  //   //4
  //   title: taskText,
  //   ID: Date.now(),
  //   // state: notStarted,
  //   state: {
  //     notStarted: true,
  //     inProgress: false,
  //     completed: false,
  //   },
  // };
  //5 Push Task To Array Of Tasks
  // tasksArr.push(task); // BASE
  // addDataToLocalStorageFrom(tasksArr);
  // console.log(tasksArr); //test2
  //6 Add Tasks To Page // FIRST
  // addTasksToPage(tasksArr); //YOU HAVE TO ADD TO PAGE AFTER EDITING LOCAL STORAGE
  //11 Add Tasks To Local Storage after Editing// SECOND
  // addNewTaskToArray();
  // editTaskLocation(id);
}

// function editTaskLocation(id) {
//   // switch (true) {
//   //   case taskBox.parentElement === completedList:
//   //     task.state.completed;
//   //     break;
//   //   case taskBox.parentElement === inProgressList:
//   //     task.state.inProgress;
//   //     break;
//   //   case taskBox.parentElement === notStartedList:
//   //     task.state.notStarted;
//   //     break;
//   // }
//   // updateArrayAndLocalStorage(id);
//   // addNewTaskToArray();
//   // addNewTaskToArray(taskText);// not need
//   // addDataToLocalStorageFrom(arr); // in delete fun.
// }
