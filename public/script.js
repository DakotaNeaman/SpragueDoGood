import {initializeApp} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import { loginListener } from "./authentication/signin.js";
import { registerListener } from "./authentication/register.js";
import { addStateChangeListener } from "./stateChange.js";
import { signOutListener } from "./authentication/signout.js";

const firebaseConfig = {
  apiKey: "AIzaSyD86x0Z1WVI76hUxXRlc7tT40Ow1SIeFo8",
  authDomain: "spraguedogood.firebaseapp.com",
  projectId: "spraguedogood",
  storageBucket: "spraguedogood.firebasestorage.app",
  messagingSenderId: "822051942736",
  appId: "1:822051942736:web:0d31ec5c9db927cea2bc55",
  measurementId: "G-X2K3F2SL36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let headerButtons = document.getElementsByClassName("header-button");
let selectedButtons = document.getElementsByClassName("selected");


for (let i = 0; i < headerButtons.length; i++) {
    let currentButton = headerButtons[i];
    currentButton.addEventListener("click", function() {
        if(selectedButtons.length!=0) {
            selectedButtons[0].classList.add("unselected");
            selectedButtons[0].classList.remove("selected");
        }
        if(currentButton.classList.contains("unselected")) {
            currentButton.classList.add("selected");
            currentButton.classList.remove("unselected");
        }
    });
}
loginListener(auth,db);
registerListener(auth,db);
addStateChangeListener(auth);
signOutListener(auth);