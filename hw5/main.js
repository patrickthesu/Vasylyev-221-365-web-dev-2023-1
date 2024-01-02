'use strict';

const API_KEY = '50d2199a-42dc-447d-81ed-d68a443b697e';
const HOST = 'http://tasks-api.std-900.ist.mospolytech.ru';

let btn = document.querySelector('#create');


function clearTasksLists() {
    const lists = [...document.querySelectorAll('.list-group')];

    lists.map(list => [...list.children].map(
        child => !child.classList.contains('d-none') ? child.remove() : null
    ));
}

async function getTasks() {
    await fetch(`${HOST}/api/tasks?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            clearTasksLists();
            data.tasks.map(item=>createItem(item));
        });
}

async function editTask(id, name, description, status) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("status", status);

    const requestOptions = {
        method: 'PUT',
        body: formData,
        redirect: 'follow'
    };

    fetch(
        `${HOST}/api/tasks/${id}?api_key=${API_KEY}`,
        requestOptions
    )
        .then(response => getTasks())
        .catch(error => console.log('error', error));

    getTasks();
}

function createItem(value) {
    const list = document.querySelector(`#${value.status}-list`);
    const item = document.getElementById('task-template').cloneNode(true);

    item.querySelector(
        '.task-name'
    ).textContent = value.name ? value.name : 'No name';

    item.dataset.id = value.id;
    item.dataset.status = value.status;
    item.querySelector('.task-description').textContent = value.desc;
    item.classList.remove('d-none');

    const moveRight = item.querySelector('#moveDone');
    moveRight.addEventListener('click', event => {
        let task = event.target.closest('#task-template');
        let name = task.querySelector('.task-name').textContent;
        let description = task.querySelector('.task-description').textContent;
        let id = task.dataset.id;
        editTask(id, name, description, 'done');
    });

    const moveLeft = item.querySelector('#moveToDo');
    moveLeft.addEventListener('click', event => {
        let task = event.target.closest('#task-template');
        let name = task.querySelector('.task-name').textContent;
        let description = task.querySelector('.task-description').textContent;
        let id = task.dataset.id;
        editTask(id, name, description, 'to-do');
    });

    list.append(item);
}

async function deleteTask(id) {
    const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    await fetch(
        `${HOST}/api/tasks/${id}?api_key=${API_KEY}`,
        requestOptions
    )
        .catch(error => console.log('error', error));
    await getTasks();
}

async function createTask(name, description, status) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("status", status);

    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    await fetch(
        `${HOST}/api/tasks?api_key=${API_KEY}`,
        requestOptions
    )
        .then(response => response.json())
        .then(data => createItem(data))
        .catch(error => console.log('error', error));

    getTasks();
}

btn.addEventListener('click', function(event) {
    let modal = event.target.closest('.modal');
    let name = modal.querySelector('#nameTask').value;
    let description = modal.querySelector('#textTask').value;
    let status = modal.querySelector('#select').value;

    createTask(name, description, status);
});

function showModal(event) {
    let task = event.relatedTarget.closest('#task-template');
    let name = task.querySelector('.task-name').textContent;
    let description = task.querySelector('.task-description').textContent;
    event.target.querySelector('#showNameTask').value = name;
    event.target.querySelector('#showTextTask').value = description;
};

const showShowModal = document.querySelector('#showModal');
showShowModal.addEventListener('show.bs.modal', showModal);

function editModal(event) {
    let task = event.relatedTarget.closest('#task-template');
    let name = task.querySelector('.task-name').textContent;
    let description = task.querySelector('.task-description').textContent;
    let id = task.dataset.id;
    let status = task.dataset.status;
    event.target.querySelector('#editNameTask').value = name;
    event.target.querySelector('#editTextTask').value = description;
    const btn = event.target.querySelector('#save');
    btn.addEventListener('click', function(event) { 
        name = document.getElementById('editNameTask').value;
        description = document.getElementById('editTextTask').value;
        editTask(id, name, description, status);
    });
}

const showEditModal = document.querySelector('#editModal');
showEditModal.addEventListener('show.bs.modal', editModal);

function removeModal(event) {
    let task = event.relatedTarget.closest('#task-template');
    let name = task.querySelector('.task-name').textContent;
    let id = task.dataset.id;
    event.target.querySelector('#removeNameTask').textContent = name;
    const btn = event.target.querySelector('#removeModalBtn');
    btn.addEventListener('click', function(event) {
        deleteTask(id);
        document.querySelector((`[data-id="${id}"]`)).remove();
        
    });
}

const showRemoveModal = document.querySelector('#removeModal');
showRemoveModal.addEventListener('show.bs.modal', removeModal);

window.onload = function () { 
    getTasks();
};
