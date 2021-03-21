//UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;
//load items from array
loadItems();

// call evet listeners
eventListener();

function eventListener() {
    // submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);

    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {
    items = getItemsFromLocalStorage();
    items.forEach(function (i) {
        createItemOfLi(i);
    })
}

function getItemsFromLocalStorage() {
    if (localStorage.getItem('items') === null) {
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLocalStorage(text) {
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function removeItemFromLocalStorage(text) {
    items.forEach(function (item, index) {
        if (text===item) {
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
        }
    });        
}

function createItemOfLi(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    const a = document.createElement('a');
    a.className = 'delete-item float-end';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);

    taskList.appendChild(li);
}

function addNewItem(e) {

    if (input.value === '') {
        alert('Add new item, vlue is not empty!')
    }
    else {
        createItemOfLi(input.value);
        setItemToLocalStorage(input.value)
        input.value = '';
    }
    e.preventDefault();
}

function deleteItem(e) {
    
    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure ?')) {
            removeItemFromLocalStorage(e.target.parentElement.parentElement.textContent)
            e.target.parentElement.parentElement.remove();
        }
    }
    e.preventDefault();
}

function deleteAllItems(e) {

    if (confirm('Are you sure ?')) {
        taskList.querySelectorAll('li').forEach(function (i) {
            i.remove();
        });
        localStorage.removeItem('items');
    }

    //simple way
    //taskList.innerHTML='';

    //other way
    /*
    taskList.childNodes.foreach(function(item){
        if(item.nodeType===1){
            item.remove();
        }
    });
    */

    e.preventDefault();
}