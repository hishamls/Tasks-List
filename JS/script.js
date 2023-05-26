////////////////////VARIABLES///////////
const inputField = document.querySelector("input");
const addBtn = document.querySelector(".add");
const tasksList = document.querySelectorAll(".tasks-list"); //note All // not work also// =[]

const notStartedList = document.querySelector(".notStarted");
const inProgressList = document.querySelector(".inProgress");
const completedList = document.querySelector(".completedList");

const emptyNotBtn = document.querySelector(".empty-not"); // not forget . for class
const emptyInPBtn = document.querySelector(".empty-inP");
const emptyCompBtn = document.querySelector(".empty-com");

let tasksArr = [];

///////////FUNCTIONS/////////
////////STEP 1:FIRST addOldDataToPage://////
// 1 getDataFromLocalStorage()
function getDataFromLocalStorage() {
  let oldData = window.localStorage.getItem("Tasks");
  if (oldData) {
    let oldTasks = JSON.parse(oldData);
    tasksArr = oldTasks;
    addTasksToPage(tasksArr);
  }
}
// 2 addTasksToPage(arr)
function addTasksToPage(arr) {
  // Empty tasks lists to avoid repeating old tasks
  notStartedList.innerHTML = "";
  inProgressList.innerHTML = "";
  completedList.innerHTML = "";

  // Looping On Array Of Tasks
  tasksArr.forEach((task) => {
    let taskLI = document.createElement("li");
    taskLI.textContent = task.title;

    let taskBox = document.createElement("div");
    taskBox.classList.add("task-box", "draggable");
    taskBox.setAttribute("data-id", task.ID);
    taskBox.setAttribute("draggable", "true");
    taskBox.addEventListener("dragstart", dragStart);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<ion-icon name="trash-outline" class="icn"></ion-icon> `;
    deleteBtn.className = "delete";
    deleteBtn.addEventListener("click", (e) => {
      //REMOVE ELEMENT FORM LOCAL STORAGE SHOULD FIRSTLY
      let id = taskBox.getAttribute("data-id");
      deleteTaskFromTasksArrayAndLocalStorageWith(id);
      //REMOVE ELEMENT FORM PAGE  SHOULD SECONDLY
      deleteBtn.parentElement.remove();
      // deleteBtn.parentElement.innerHTML = ""; //  work
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
function deleteTaskFromTasksArrayAndLocalStorageWith(id) {
  // tasksArr = tasksArr.filter((task) => task.ID !== parseInt(id));
  tasksArr = tasksArr.filter((task) => task.ID !== id);
  addDataToLocalStorageFrom(tasksArr);
}
function addDataToLocalStorageFrom(arr) {
  localStorage.setItem("Tasks", JSON.stringify(arr));
  // }
  /////////////////SECOND:////////////////////////////
  // SECOND: ADD NEW DATA FROM ADD BUTTON:
  // 3 addNewTaskToArray(taskText)
  function addNewTaskToArray(taskText) {
    const task = {
      title: taskText,
      ID: Date.now(),
      state: {
        notStarted: true,
        inProgress: false,
        completed: false,
      },
    };
    tasksArr.push(task);
    addTasksToPage(tasksArr);
    addDataToLocalStorageFrom(tasksArr);
  }
  // 4 addDataToLocalStorageFrom(arr) IN 2
  // 5 = 1
  // 6 = 2
  // end

  /////////////////THIRD:////////////////////////////
  // EDITED DATA FROM DRAG AND DROP ON THE PAGE
  // THIRD: EDITING DATA FORM EDIT BUTTON:

  // function updateArrayAndLocalStorage(id, state) {
  //   const task = tasksArr.find((task) => task.ID === id);
  //   task.state = state;
  //   addDataToLocalStorageFrom(tasksArr);
  // }
  // editData();
  // function editData(id, dropzone) {
  //   let id = taskBox.getAttribute("data-id");
  //   deleteTaskFromTasksArrayAndLocalStorageWith(id);
  //   addNewTaskToArray(taskText);
}
