import { User } from './model/User.js';
import { View } from './view/View.js';

let view;
let user;

document.querySelector('.nameContainer button').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let container = document.querySelector('.nameContainer');
    let name = document.querySelector('.nameContainer input');
    let username = document.querySelector('.addContainer p');
    let nameInput = name.value;
    if (nameInput == null || nameInput == "" || isNumeric(nameInput)) {
        return alert("Enter a valid username"); 
    }

    view = new View();
    user = new User(view, nameInput);
    username.innerText = "Username: " + user.getName();

    view.setUser(user);
    container.classList.add("hide");
    view.updateList();
    name.value = null;
})

document.querySelector('.pet-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let input = document.querySelector('.nameInput-container input');
    let select = document.querySelector('.nameInput-container .selectAnimal');
    
    let name = input.value;
    if (name == null || name == "") {
        name = switchName();
        console.log(name);
    }
    user.add(select.value, name);
    input.value = null;
    view.updateList();
})

function isNumeric(text) {
    return (Number.isInteger(Number(text)));
}

let nameIndex = 0;

function switchName() {
    let names = ["Bella", "Daisy", "Lucy", "Lily",
        "Zoe", "Lola", "Sadie", "Bailey", "Stella",
        "Max", "Charlie", "Cooper", "Milo", "Buddy",
        "Rocky", "Bear", "Teddy", "Duke", "Leo"];
    if (nameIndex >= names.length) {
        nameIndex = 0;
    }
    return names[nameIndex++];
}