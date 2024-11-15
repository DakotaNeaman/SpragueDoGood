import { initializeApp } from "firebase/app";
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

var unselectedElements = document.getElementsByClassName("unselected");
var selectedElements = document.getElementsByClassName("selected");
var buttons = document.getElementsByClassName("buttons");
for(var i=0;i<buttons.length;i++) {

    const currentElement = buttons[i];

    currentElement.addEventListener("click", function(event) {
        selectedElements = document.getElementsByClassName("selected");


        selectedElements[0].classList.add("unselected");
        selectedElements[0].classList.remove("selected");

        currentElement.classList.add("selected");
        currentElement.classList.remove("unselected");

        

    },false);
}