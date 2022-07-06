
function addItemList(task, checked) {
    const list = document.getElementById('task-list');
    const li = document.createElement("li");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const button = document.createElement('button');

    input.type = "checkbox";
    input.name = "taskCompleted";
    input.checked = checked;
    input.addEventListener("change", e => {
        const ck = e.target;
        const li = e.target.parentNode;
        markItem(li, ck);
    })

    span.innerText = task;
    span.className = "task";

    button.innerText= 'X';
    button.className = "delete-btn";
    button.addEventListener("click", e => {
        const li = e.target.parentNode;
        const ul = li.parentNode;
        removeItemList(ul, li);
    });

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
    markItem(li, input);
}

function removeItemList(ul, li) {
    const span = li.childNodes[1];

    taskList = taskList.filter(({task}) => task != span.innerText);
    ul.removeChild(li);

    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function markItem(li, ck) {
    const span = li.childNodes[1];

    ck.checked
            ? span.classList.add('markDone')
            : span.classList.remove('markDone');

    const index = taskList.findIndex(({task}) => task == span.innerText)
    taskList[index].completed = ck.checked;
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTask() {
    const inputTask = document.getElementById('input-task');
    const task = inputTask.value;
    const completed = false;

    if (task == '')
        return;

    taskList.push({task, completed});
    addItemList(task, completed);

    inputTask.value = '';

    localStorage.setItem("tasks", JSON.stringify(taskList));
}

let taskList;

window.onload = function() {

    taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    taskList.forEach(({task, completed}) => addItemList(task, completed));

}