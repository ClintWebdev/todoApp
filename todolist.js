const itemArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

console.log(itemArray);
document.querySelector("#addTask").addEventListener("click", () => {
    const item = document.querySelector("#item");
    if (item.value.trim() !== "") {
        createItem(item);
    } else {
        console.log('Can\'t add an empty task...');
    }
});

function displayItems() {
    let items = '';
    for (let i = 0; i < itemArray.length; i++) {
        items += `<div class="item">
        <div class="input-controller">
            <textarea disabled>${itemArray[i]}</textarea>
            <div class="edit-controller">
                <i class="fa-solid fa-trash deleteBtn"></i>
                <i class="fa-solid fa-pen-to-square editBtn"></i>
            </div>
        </div>
        <div class="update-controller" style="display:none;">
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        </div>
    </div>`;
    }
    document.querySelector(".to-do-list").innerHTML = items;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

function activateDeleteListeners() {
    let deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach((db, i) => {
        db.addEventListener("click", () => {
            deleteItem(i);
        });
    });
}

function activateEditListeners() {
    const editBtns = document.querySelectorAll(".editBtn");
    const updateControllers = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");

    editBtns.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            updateControllers[i].style.display = "block";
            inputs[i].disabled = false;
        });
    });
}

function activateSaveListeners() {
    const saveBtns = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtns.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i);
        });
    });
}

function activateCancelListeners() {
    const cancelBtns = document.querySelectorAll(".cancelBtn");
    const updateControllers = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtns.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateControllers[i].style.display = "none";
            inputs[i].disabled = true;
        });
    });
}

function updateItem(text, i) {
    itemArray[i] = text;
    localStorage.setItem("items", JSON.stringify(itemArray));
    location.reload();
}

function deleteItem(i) {
    itemArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemArray));
    location.reload();
}

function createItem(item) {
    itemArray.push(item.value);
    localStorage.setItem("items", JSON.stringify(itemArray));
    item.value = ''; // Clear the input field after adding an item
    location.reload();
}

function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
    displayDate();
    displayItems();
};
