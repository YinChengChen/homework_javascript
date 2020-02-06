/* project: todo list */

/* Parameters */
let todolist = [];
let addbutton = document.querySelector(".addbutton");
let inputBox = document.querySelector("#todo");
let trashbutton = document.querySelectorAll(".trashbutton");
/* function */

// add event to list
function addtodo(todo) {
    // save to object
    let todoEvent = {
        id: "",
        name: ""
    };
    todoEvent.name = todo;
    // add to list
    todolist.push(todoEvent);
    console.log("add event:", todolist);
};

// display a card of event
function displayCard(todoid, todoName) {
    let node = document.createElement("LI");
    let textnode = document.createTextNode(todoName);
    let pnode = document.createElement("P");
    let buttonnode = document.createElement("BUTTON");
    let iconnode = document.createElement("I");
    iconnode.setAttribute("class", "fa fa-trash");
    buttonnode.setAttribute("id", todoid);
    buttonnode.setAttribute("class", "trashbutton");
    buttonnode.appendChild(iconnode);
    node.setAttribute("class", "eventbox");
    pnode.appendChild(textnode);
    node.appendChild(pnode);
    node.appendChild(buttonnode);
    eventlist.appendChild(node);
};

// display the events on the window
function displaytodo(todolist) {
    var eventlist = document.getElementById("eventlist");

    /**
     * check if event list has any element, it need to clean the child nodes.
     * not sure this is a good way.
     */
    while (eventlist.firstChild) {
        eventlist.removeChild(eventlist.firstChild);
    }

    for (let i = 0; i < todolist.length; i++) {
        //console.log("here");
        let eventId = i.toString();
        todolist[i].id = eventId;
        displayCard(todolist[i].id, todolist[i].name);
    }
}

// for all events add the trash function, this function is to delete the todo event
// Not sure this is a effective way.
function trashFunction(trashbuttons) {
    for (let j = 0; j < trashbuttons.length; j++) {
        trashbuttons[j].addEventListener("click", function () {
            console.log("trash button", event.currentTarget.nodeName, event.currentTarget.id, typeof (event.currentTarget.id));
            let indexId = event.currentTarget.id;
            todolist.forEach(function (todoObject) {
                if (todoObject.id == indexId) {
                    console.log("found this object: ", todoObject, " and delete it");
                    todolist.splice(parseInt(indexId), 1);
                }
            });
            console.log("after deleted:", todolist);
            // update the window
            displaytodo(todolist);
            // update the local storage
            updateLocalStorage(todolist);
            // update the trash button
            updateDeleteEvents();
        }, false);
    }
}

function updateDeleteEvents() {
    // update the trash button
    trashbutton = document.querySelectorAll(".trashbutton");
    console.log("button:", trashbutton);
    trashFunction(trashbutton);
};

// update data on the local storage
function updateLocalStorage(todolist) {
    localStorage.clear();
    let updateList = JSON.stringify(todolist);
    localStorage.setItem("storeList", updateList);
}

// delete existed event
trashFunction(trashbutton);

// local storage use
// first use : we don't have any data on the local storage
if (!localStorage.getItem("storeList")) {
    console.log("here");
    let storeList = JSON.stringify(todolist);
    localStorage.setItem("storeList", storeList);
} else {
    let loadList = localStorage.getItem("storeList");
    todolist = JSON.parse(loadList);
    // update the window
    displaytodo(todolist);
    // update the trash button
    updateDeleteEvents();
}

// "Add" event
addbutton.addEventListener("click", function () {

    let todo = document.getElementById("todo").value;

    // check if todo is empty
    if (todo.length == 0) {
        alert("請紀錄要做的事情。")
    } else {
        addtodo(todo);
    }

    // update the window
    displaytodo(todolist);
    // update the local storage
    updateLocalStorage(todolist);
    // update the trash button
    updateDeleteEvents();
}, false);

// use "Enter" key to add event, because I am lazy.

inputBox.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        let todo = document.getElementById("todo").value;
        // check if todo is empty
        if (todo.length == 0) {
            alert("請紀錄要做的事情。")
        } else {
            addtodo(todo);
        }

        // update the window
        displaytodo(todolist);
        // update the local storage
        updateLocalStorage(todolist);
        // update the trash button
        updateDeleteEvents();
    }
}, false);








