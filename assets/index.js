const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

//set type to module in HTML file as the import has been used.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shopping-5f522-default-rtdb.europe-west1.firebasedatabase.app/",
};

// initializeApp is given the appSettings argument. This will connect the project with firebase.
const app = initializeApp(appSettings);

//database variable that will pass in the app as an argument.
const database = getDatabase(app);

//setting up the reference. It is imported above. The ref takes in the datatbase and then it is called shoppingList.
const shoppingListDB = ref(database, "shoppingList");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  //input value is pushed to the shopping list database.
  push(shoppingListDB, inputValue);

  clearInput();

  addItemToShoppingList(inputValue);
});

//resets the input field once the user has searched.
function clearInput() {
  inputFieldEl.value = "";
}

//add shoppping list itmes entered below the buttons to the existing list.
function addItemToShoppingList(item) {
  shoppingListEl.innerHTML += `<li>${item}</li>`;
}
