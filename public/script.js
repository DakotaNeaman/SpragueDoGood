import {initializeApp} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

let headerButtons = document.getElementsByClassName("header-button");
let selectedButtons = document.getElementsByClassName("selected");


for (let i = 0; i < headerButtons.length; i++) {
    let currentButton = headerButtons[i];
    currentButton.addEventListener("click", function() {
        if(currentButton.classList.contains("unselected")) {
            selectedButtons[0].classList.add("unselected");
            selectedButtons[0].classList.remove("selected");

            currentButton.classList.add("selected");
            currentButton.classList.remove("unselected");
        }
    });
}