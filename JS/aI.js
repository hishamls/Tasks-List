////////////////////VARIABLES///////////
let inputField = document.querySelector("input");
let addBtn = document.querySelector(".add");
let tasksList = document.querySelectorAll(".tasks-list"); //note All
let notStartedList = document.querySelector(".notStarted");
let inProgressList = document.querySelector(".inProgress");
let completedList = document.querySelector(".completed");

let emptyNotBtn = document.querySelector(".empty-not");
let emptyInPBtn = document.querySelector(".empty-inP");
let emptyCompBtn = document.querySelector(".empty-com");

let tasksArr = [];

////Handle drag targets events/////
tasksList.forEach((uL) => {
  uL.addEventListener("dragenter", dragEnter);
  uL.addEventListener("dragover", dragOver);
  uL.addEventListener("drop", drop);
  uL.addEventListener("dragleave", dragLeave);
});

//////////////FUNCTIONS/////////////
addOldDataToPage();

//FIRST GET DATA FROM LOCAL STORAGE
function getDataFromLocalStorage() {
  let oldData = window.localStorage.getItem("Tasks");
  if (oldData) {
    let oldTasks = JSON.parse(oldData);
    tasksArr = oldTasks;
    addTasksToPage(tasksArr);
  }
}

//SECOND GET DATA FROM INPUT BUTTON
addBtn.addEventListener("click", () => {
  if (inputField.value !== "") {
    addNewTaskToArray(inputField.value);
    inputField.value = "";
  }
});

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
  tasksArr(task);
  addTasksToPage(tasksArr);
  addDataToLocalStorageFrom(tasksArr);
}

function addTasksToPage(arr) {
  notStartedList.innerHTML = "";
  inProgressList.innerHTML = "";
  completedList.innerHTML = "";

  arr.forEach((task) => {
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
      let id = taskBox.getAttribute("data-id");
      deleteTaskFromTasksArrayAndLocalStorageWith(id);
      deleteBtn.parentElement.remove();
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
  localStorage.setItem("Tasks", JSON.stringify(arr));
}

function addOldDataToPage() {
  getDataFromLocalStorage();
}

function deleteTaskFromTasksArrayAndLocalStorageWith(taskId) {
  tasksArr = tasksArr.filter((task) => task.ID != taskId);
  addDataToLocalStorageFrom(tasksArr);
}

emptyNotBtn.onclick = (e) => {
  tasksArr = tasksArr.filter((task) => task.state.notStarted === false);
  addDataToLocalStorageFrom(tasksArr);
  addTasksToPage(tasksArr);
};

emptyInPBtn.addEventListener("click", () => {
  tasksArr = tasksArr.filter((task) => task.state.inProgress === false);
  addDataToLocalStorageFrom(tasksArr);
  addTasksToPage(tasksArr);
});

emptyCompBtn.addEventListener("click", () => {
  tasksArr = tasksArr.filter((task) => task.state.completed === false);
  addDataToLocalStorageFrom(tasksArr);
  addTasksToPage(tasksArr);
});

////////DRAG & DROP FUNCTIONS/////////////
function dragStart(e) {
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
  e.dataTransfer.setData("text/plain", e.target.dataset.id);
}

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
  }
}

function drop(e) {
  if (e.target.classList.contains("tasks-list")) {
    e.preventDefault();
    let id = e.dataTransfer.getData("text/plain");
    let draggable = document.querySelector(`[data-id="${id}"]`);
    let dropzone = e.target;
    dropzone.appendChild(draggable);
    dropzone.classList.remove("over");
    draggable.classList.remove("hide");
    updateArrayAndLocalStorage(id, dropzone);
  }
}

function updateArrayAndLocalStorage(id, dropzone) {
  let taskToUpdate = tasksArr.find((task) => task.ID == id);
  switch (dropzone) {
    case completedList:
      taskToUpdate.stat; // //VARIABLES
      // const inputField = document.querySelector("input");
      // const addBtn = document.querySelector(".add");
      // const tasksListContainer = document.querySelector(".tasks-lists-container");
      // const notStartedList = document.querySelector(".notStarted");
      // const inProgressList = document.querySelector(".inProgress");
      // const completedList = document.querySelector(".completed");
      // const emptyNotBtn = document.querySelector(".empty-not");
      // const emptyInPBtn = document.querySelector(".empty-inP");
      // const emptyCompBtn = document.querySelector(".empty-com");
      // let tasksArr = [];

      // //HANDLING DRAG TARGETS EVENTS
      // tasksListContainer.addEventListener("dragenter", dragEnter);
      // tasksListContainer.addEventListener("dragover", dragOver);
      // tasksListContainer.addEventListener("drop", drop);
      // tasksListContainer.addEventListener("dragleave", dragLeave);

      // //FUNCTIONS
      // addOldDataToPage();

      // function addOldDataToPage() {
      //   // Get data from local storage
      //   const oldData = window.localStorage.getItem("Tasks");
      //   if (oldData) {
      //     const oldTasks = JSON.parse(oldData);
      //     tasksArr = oldTasks;
      //     addTasksToPage(tasksArr);
      //   }
      // }

      // function addNewTaskToArray(taskText) {
      //   const task = {
      //     title: taskText,
      //     ID: Date.now(),
      //     state: {
      //       notStarted: false,
      //       inProgress: true,
      //       completed: false,
      //     },
      //   };

      //   tasksArr.push(task);
      //   addTasksToPage(tasksArr);
      //   addDataToLocalStorageFrom(tasksArr);
      // }

      // function addTasksToPage(arr) {
      //   notStartedList.innerHTML = "";
      //   inProgressList.innerHTML = "";
      //   completedList.innerHTML = "";

      //   arr.forEach((task) => {
      //     const taskLI = document.createElement("li");
      //     taskLI.textContent = task.title;

      //     const taskBox = createTaskBox(task.ID);

      //     const deleteBtn = createButton("trash-outline", "delete");
      //     deleteBtn.addEventListener("click", () => {
      //       const id = taskBox.getAttribute("data-id");
      //       deleteTaskFromTasksArrayAndLocalStorageWith(id);
      //       deleteBtn.parentElement.remove();
      //     });

      //     const editBtn = createButton("create-outline", "edit");

      //     taskBox.append(taskLI, editBtn, deleteBtn);
      //     appendTaskBoxToAppropriateList(taskBox, task.state);
      //   });
      // }

      // function addDataToLocalStorageFrom(arr) {
      //   localStorage.setItem("Tasks", JSON.stringify(arr));
      // }

      // function createTaskBox(id) {
      //   const taskBox = document.createElement("div");
      //   taskBox.classList.add("task-box", "draggable");
      //   taskBox.setAttribute("data-id", id);
      //   taskBox.setAttribute("draggable", "true");
      //   taskBox.addEventListener("dragstart", dragStart);

      //   return taskBox;
      // }

      // function appendTaskBoxToAppropriateList(taskBox, state) {
      //   switch (true) {
      //     case state.completed:
      //       completedList.appendChild(taskBox);
      //       break;
      //     case state.inProgress:
      //       inProgressList.appendChild(taskBox);
      //       break;
      //     case state.notStarted:
      //       notStartedList.appendChild(taskBox);
      //       break;
      //     default:
      //       console.log("Invalid task state");
      //   }
      // }

      // function createButton(iconName, className) {
      //   const button = document.createElement("button");
      //   button.innerHTML = `<ion-icon name="${iconName}" class="icn"></ion-icon>`;
      //   button.className = className;

      //   return button;
      // }

      // function deleteTaskFromTasksArrayAndLocalStorageWith(taskId) {
      //   tasksArr = tasksArr.filter((task) => task.ID != taskId);
      //   addDataToLocalStorageFrom(tasksArr);
      // }

      // emptyNotBtn.onclick = () => {
      //   tasksArr = tasksArr.filter((task) => !task.state.notStarted);
      //   addDataToLocalStorageFrom(tasksArr);
      //   addTasksToPage(tasksArr);
      // };

      // emptyInPBtn.onclick = () => {
      //   tasksArr = tasksArr.filter((task) => !task.state.inProgress);
      //   addDataToLocalStorageFrom(tasksArr);
      //   addTasksToPage(tasksArr);
      // };

      // emptyCompBtn.onclick = () => {
      //   tasksArr = tasksArr.filter((task) => !task.state.completed);
      //   addDataToLocalStorageFrom(tasksArr);
      //   addTasksToPage(tasksArr);
      // };

      // //DRAG & DROP FUNCTIONS
      // function dragStart(e) {
      //   setTimeout(() => {
      //     e.target.classList.add("hide");
      //   }, 0);

      //   e.dataTransfer.setData("text/plain", e.target.dataset.id);
      // }

      // function dragEnter(e) {
      //   e.preventDefault();
      // }

      // function dragOver(e) {
      //   e.preventDefault();
      //   tasksListContainer.classList.add("over");
      // }

      // function dragLeave(e) {
      //   tasksListContainer.classList.remove("over");
      // }

      // function drop(e) {
      //   e.preventDefault();
      //   const id = e.dataTransfer.getData("text/plain");
      //   const draggable = document.querySelector(`[data-id="${id}"]`);
      //   const dropzone = e.target;
      //   dropzone.appendChild(draggable);
      //   draggable.classList.remove("hide");
      //   updateArrayAndLocalStorage(id, dropzone);
      // }

      // function updateArrayAndLocalStorage(id, dropzone) {
      //   const taskBox = document.querySelector(`[data-id="${id}"]`);
      //   const newTaskState = getNewTaskStateFromDropzone(dropzone);

      //   const taskToUpdate = tasksArr.find((task) => task.ID == id);
      //   taskToUpdate.state = newTaskState;

      //   deleteTaskFromTasksArrayAndLocalStorageWith(id);
      //   addNewTaskToArray(taskToUpdate.title);
      // }

      // function getNewTaskStateFromDropzone(dropzone) {
      //   const newTaskState = {
      //     notStarted: false,
      //     inProgress: false,
      //     completed: false,
      //   };

      //   switch (dropzone) {
      //     case notStartedList:
      //       newTaskState.notStarted = true;
      //       break;
      //     case inProgressList:
      //       newTaskState.inProgress = true;
      //       break;
      //     case completedList:
      //       newTaskState.completed = true;
      //       break;
      //     default:
      //       console.log("Invalid Parent List");
      //       break;
      //   }

      //   return newTaskState;
      // }

      // //SECOND GET DATA FROM INPUT BUTTON
      // addBtn.addEventListener("click", () => {
      //   if (inputField) {
      //     if (inputField.value !== "") {
      //       addNewTaskToArray(inputField.value);
      //       inputField.value = "";
      //     }
      //   } else {
      //     console.log("Input field not found");
      //   }
      // });
      //VARIABLES
      const inputField = document.querySelector("input");
      const addBtn = document.querySelector(".add");
      const tasksLists = document.querySelectorAll(".tasks-list");

      // const notStartedList = document.querySelector(".notStarted");
      // const inProgressList = document.querySelector(".inProgress");
      // const completedList = document.querySelector(".completed");

      const emptyNotBtn = document.querySelector(".empty-not");
      const emptyInPBtn = document.querySelector(".empty-inP");
      const emptyCompBtn = document.querySelector(".empty-com");

      let tasksArr = [];

      //HANDLING DRAG TARGETS EVENTS
      tasksLists.forEach((tasksList) => {
        tasksList.addEventListener("dragenter", dragEnter);
        tasksList.addEventListener("dragover", dragOver);
        tasksList.addEventListener("drop", drop);
        tasksList.addEventListener("dragleave", dragLeave);
      });

      //FUNCTIONS
      getDataFromLocalStorage();

      function getDataFromLocalStorage() {
        const oldData = window.localStorage.getItem("Tasks");
        if (oldData) {
          const oldTasks = JSON.parse(oldData);
          tasksArr = oldTasks;
          addTasksToPage(tasksArr);
        }
      }
      function addTasksToPage(arr) {
        notStartedList.innerHTML = "";
        inProgressList.innerHTML = "";
        completedList.innerHTML = "";

        arr.forEach((task) => {
          const taskLI = document.createElement("li");
          taskLI.textContent = task.title;

          const taskBox = document.createElement("div");
          taskBox.classList.add("task-box", "draggable");
          taskBox.setAttribute("data-id", task.ID);
          taskBox.setAttribute("draggable", "true");
          taskBox.addEventListener("dragstart", dragStart);

          const deleteBtn = document.createElement("button");
          deleteBtn.innerHTML = `<ion-icon name="trash-outline" class="icn"></ion-icon>`;
          deleteBtn.classList.add("delete");
          deleteBtn.addEventListener("click", () => {
            const id = taskBox.getAttribute("data-id");
            deleteTaskFromTasksArrayAndLocalStorageWith(id);
            deleteBtn.parentElement.remove();
          });

          const editBtn = document.createElement("button");
          editBtn.innerHTML = ` <ion-icon name="create-outline" class="icn"></ion-icon> `;
          editBtn.classList.add("edit");
          editBtn.addEventListener("click", (e) => {});
        });
      }
      function addNewTaskToArray(taskText) {
        const task = {
          title: taskText,
          ID: Date.now(),
          state: {
            notStarted: false,
            inProgress: true,
            completed: false,
          },
        };
        tasksArr.push(task);
        addTasksToPage(tasksArr);
        addDataToLocalStorageFrom(tasksArr);
      }

      function updateArrayAndLocalStorage(id, state) {
        let task = tasksArr.find((task) => task.ID === id);
        task.state = state;
        addDataToLocalStorageFrom(tasksArr);
      }

      function deleteTaskFromTasksArrayAndLocalStorageWith(id) {
        tasksArr = tasksArr.filter((task) => task.ID !== parseInt(id));
        addDataToLocalStorageFrom(tasksArr);
      }

      function addDataToLocalStorageFrom(arr) {
        window.localStorage.setItem("Tasks", JSON.stringify(arr));
      }

      function dragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.getAttribute("data-id"));
      }

      function dragEnter(e) {
        e.preventDefault();
        this.classList.add("drag-over");
      }

      function dragOver(e) {
        e.preventDefault();
        this.classList.add("drag-over");
      }

      function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        const taskBox = document.querySelector(`[data-id="${id}"]`);
        const currentState = tasksArr.find(
          (task) => task.ID === parseInt(id)
        ).state;

        if (this.classList.contains("notStarted")) {
          taskBox.remove();
          notStartedList.appendChild(taskBox);
          updateArrayAndLocalStorage(parseInt(id), {
            notStarted: true,
            inProgress: false,
            completed: false,
          });
        } else if (this.classList.contains("inProgress")) {
          taskBox.remove();
          inProgressList.appendChild(taskBox);
          updateArrayAndLocalStorage(parseInt(id), {
            notStarted: false,
            inProgress: true,
            completed: false,
          });
        } else if (this.classList.contains("completed")) {
          taskBox.remove();
          completedList.appendChild(taskBox);
          updateArrayAndLocalStorage(parseInt(id), {
            notStarted: false,
            inProgress: false,
            completed: true,
          });
        }
      }

      function dragLeave(e) {
        e.preventDefault();
        this.classList.remove("drag-over");
      }

      //EVENT LISTENERS
      addBtn.addEventListener("click", function () {
        if (inputField.value.trim() !== "") {
          addNewTaskToArray(inputField.value);
          inputField.value = "";
        }
      });

      emptyNotBtn.addEventListener("click", function () {
        notStartedList.innerHTML = "";
      });

      emptyInPBtn.addEventListener("click", function () {
        inProgressList.innerHTML = "";
      });

      emptyCompBtn.addEventListener("click", function () {
        completedList.innerHTML = "";
      });

      // Error handling for when there is no input field on the page
      if (!inputField) console.error("No input field found on page.");
      //////////////////////////
      const notStartedList = document.getElementById("not-started-list");
      const inProgressList = document.getElementById("in-progress-list");
      const completedList = document.getElementById("completed-list");

      function updateTaskStatus(taskBox, status) {
        taskBox.dataset.status = status;
      }

      function handleDrop(event, status) {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text/plain");
        const taskBox = document.getElementById(taskId);
        if (taskBox.dataset.status !== status) {
          updateTaskStatus(taskBox, status);
          switch (status) {
            case "not-started":
              notStartedList.appendChild(taskBox);
              break;
            case "in-progress":
              inProgressList.appendChild(taskBox);
              break;
            case "completed":
              completedList.appendChild(taskBox);
              break;
            default:
              break;
          }
        }
      }

      notStartedList.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      notStartedList.addEventListener("drop", (event) => {
        handleDrop(event, "not-started");
      });

      inProgressList.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      // inProgressList.addEventListener('drop', (event)) => {
      //   handleDrop(event, 'in-progress');
      // });

      completedList.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      completedList.addEventListener("drop", (event) => {
        handleDrop(event, "completed");
      });
      e.completed = true;
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
