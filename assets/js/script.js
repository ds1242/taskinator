
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed")

var taskFormHandler = function(event){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    
    
    if(taskNameInput === "" || taskTypeInput === ""){
        alert("You need to fill out the form");
        return false;
    }

    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    createTaskEl(taskDataObj);
  }   
};
var createTaskEl = function(taskDataObj){
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskAction(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // add entire item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase counter
    taskIdCounter++;
    

}
var createTaskAction = function(taskId){

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var selectStatusEl = document.createElement("select");
    selectStatusEl.textContent = "select-status";
    selectStatusEl.setAttribute("name", "status-change");
    selectStatusEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(selectStatusEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for(var i = 0; i < statusChoices.length; i++){
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        selectStatusEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};
var completeEditTask = function(taskName, taskType, taskId){
    console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated");
    formEl.removeAttribute("data-type-id");
    formEl.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event){
    console.log(event.target);
    if(event.target.matches(".edit-btn")){
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    } else if(event.target.matches(".delete-btn")){
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};
var taskStatusChangeHandler = function(event){
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }
}
var editTask = function(taskId){
    console.log("editing task #" + taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    
    formEl.setAttribute("data-task-id", taskId);
    formEl.querySelector("#save-task").textContent = "Save Task";
};
var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}


formEl.addEventListener("submit", taskFormHandler);


pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
