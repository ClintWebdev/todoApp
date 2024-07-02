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
                <i class="deleteBtn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></i>
                <i class="editBtn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></i>
                
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
