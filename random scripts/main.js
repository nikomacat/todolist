const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

taskInput.addEventListener("keydown", onTaskInputKeyDown);

displaySavedTasks();

function onTaskInputKeyDown(event) {
    if (event.keyCode == 13) {
        //let taskText = taskInput.value;
        let taskText = messUpText(taskInput.value, "medium");
        
        if (taskInput.value) {
        addTask(taskText);
        taskInput.value = "";
        saveTusks();
        } else {
            alert('fucking enter something please');
        }
    }
};



function addTask(text) {

    const numberOfTasks = taskList.getElementsByTagName("li").length;
    const uniqueId = Date.now();

    const taskId = "task_" + uniqueId;

    let taskItem = document.createElement("li");

    const taskItemWrapper = document.createElement("div");
    taskItemWrapper.classList.add("taskItemWrapper");

    const cliffBody = document.createElement("div");
    cliffBody.classList.add("cliffBody");
    taskItemWrapper.appendChild(cliffBody);

    let edgeVariable = getRandomInt(10, 70);

    let cliffBrightness = 40 + (10 * numberOfTasks);
    cliffBody.style.backgroundColor = `hsl(0, 0%, ${cliffBrightness})`;
    cliffBody.style.right = `-${edgeVariable}px`;

    const cliffEdge = document.createElement("div");
    cliffEdge.classList.add("cliffEdge");
    cliffEdge.style.borderRightWidth = `${edgeVariable}px`;
    cliffBody.appendChild(cliffEdge);

    let taskCheckbox = document.createElement("input");
    taskCheckbox.id = taskId;
    taskCheckbox.type = "checkbox";

    let taskLabel = document.createElement("label");
    taskLabel.htmlFor = taskId;
    taskLabel.value = text;

    const labelText = document.createElement("div");
    labelText.classList.add("labelText");
    labelText.innerText = text;
    taskLabel.appendChild(labelText);

    let removeTaskButton = document.createElement("span");
    removeTaskButton.classList.add("removeTask");
    removeTaskButton.innerText = " x ";
   
    const grandmaContainer = document.createElement("div");
    grandmaContainer.classList.add("grandmaContainer");

    const grandmaInnerContainer = document.createElement("div");
    grandmaInnerContainer.classList.add("grandmaInnerContainer");

    grandmaContainer.appendChild(grandmaInnerContainer);

    const grandmaImage = document.createElement("div");
    grandmaImage.classList.add("grandmaImage");
    grandmaInnerContainer.appendChild(grandmaImage);

    const grandmaText = document.createElement("div");
    grandmaText.classList.add("grandmaText");
    grandmaText.innerText = text;
    grandmaInnerContainer.appendChild(grandmaText);


    taskItem.appendChild(taskItemWrapper)
    taskItemWrapper.appendChild(grandmaContainer);
    taskItemWrapper.appendChild(taskCheckbox);
    taskItemWrapper.appendChild(taskLabel);
    taskItemWrapper.appendChild(removeTaskButton);

    taskList.appendChild(taskItem);
    
    removeTaskButton.addEventListener("click", onRemoveTaskClick);

     dragElement(grandmaInnerContainer, onGrandmaBeingDragged, onGrandmaReleased);

    saveTusks();
}

function onGrandmaReleased(grandmaInnerContainer) {
    grandmaInnerContainer.classList.add("animateReturn");
    grandmaInnerContainer.style.left = "60px";
}
function onGrandmaBeingDragged(grandma) {
    grandma.classList.remove("animateFall");
    grandma.classList.remove("animateReturn");
    if (grandma.offsetLeft > 70) {
        grandma.querySelector(".grandmaImage").style.top = "1500px";
    }
}

function onRemoveTaskClick(event) {
    this.closest("li").remove();
    saveTusks();
}

function generateRandomInt(maxLimit) {
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand);
    return rand;
}

function messUpText (text, severity) {
    const randomNumberOne = generateRandomInt(nouns.length);
    const randomNumberTwo = generateRandomInt(verbs.length);

    const randomNoun = nouns[randomNumberOne];
    const randomVerb = verbs[randomNumberTwo];

    let messedUpText = randomVerb + " the " + randomNoun;
    
    if(severity == "high") {
        messedUpText = randomVerb + " the " + randomNoun;
    } else if (severity == "medium") {
        messedUpText = text + " and " + randomVerb + " the " + randomNoun;
    } else if (severity == "santa") {
        messedUpText = "hohoho";
    } else {
        messedUpText = randomVerb + " the " + randomNoun;

    }
    return messedUpText
}

function saveTusks() {
    const allTasks = taskList.getElementsByTagName("li");
    let allTasksTexts = [];

    for (let index = 0; index < allTasks.length; index++) {
        allTasksTexts.push(allTasks[index].querySelector("label").innerText);
    }
    localStorage.setItem("allTaskTexts", allTasksTexts);
}

function displaySavedTasks() {
    const savedTasks = localStorage.getItem("allTaskTexts").split(",");

    for (let index = 0; index < savedTasks.length; index++) {
        addTask(savedTasks[index]);
        
    }
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function dragElement(elmnt, onDragProgress, onDragEnd) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.ontouchstart = dragMouseDown;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

    let touchOrClick = e;
    if(typeof e.touches !== "undefined") {
        touchOrClick = e.touches[0];
    }
    pos3 = touchOrClick.clientX;
    pos4 = touchOrClick.clientY;

    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;

    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        if(onDragProgress) {
            onDragProgress(elmnt);
        }
    
        let touchOrClick = e;
        if (typeof e.touches !== "undefined") {
            touchOrClick = e.touches[0];
        }
        pos1 = pos3 - touchOrClick.clientX;
        pos2 = pos4 - touchOrClick.clientY;
        pos3 = touchOrClick.clientX;
        pos4 = touchOrClick.clientY;

        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {

        document.onmouseup = null;
        document.onmousemove = null;

        if(onDragEnd) {
            onDragEnd(elmnt);
        }
    }
}