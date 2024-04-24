const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

//set type to module in HTML file as the import has been used.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shopping-5f522-default-rtdb.europe-west1.firebasedatabase.app/",
};

// initializeApp is given the appSettings argument. This will connect the project with firebase.
const app = initializeApp(appSettings);

//database variable that will pass in the app as an argument.
const database = getDatabase(app);

//setting up the reference. It is imported above. The ref takes in the database and then it is called shoppingList.
const shoppingListDB = ref(database, "shoppingList");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  //input value is pushed to the shopping list database.
  push(shoppingListDB, inputValue);

  clearInput();
});

onValue(shoppingListDB, function (snapshot) {
  let itemsArray = Object.entries(snapshot.val()); //converts snapshot.val() from an object to an Array. Entries gives both the id and value in the array.

  clearShoppingListEl(); //clearing the items before they are added onto the list. Stops items being added multiple times.

  for (var i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];

    addItemToShoppingList(currentItem); //appends each item to the shopping list element for each iteration.
  }
});

// used to clear the shoppingListEl
function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

//resets the input field once the user has searched.
function clearInput() {
  inputFieldEl.value = "";
}

//add shoppping list itmes entered below the buttons to the existing list.
function addItemToShoppingList(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  shoppingListEl.append(newEl);
}
