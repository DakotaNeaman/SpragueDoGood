import {initializeApp} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { doc, getDoc,updateDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import { login } from "./authentication/signin.js";
import { addStateChangeListener } from "./stateChange.js";
import { signOutAndUpload } from "./authentication/signout.js";
import { uploadText } from "./loadText.js";
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

// Add selected/unselected classes to buttons when clicked
for (let i = 0; i < headerButtons.length; i++) {
    let currentButton = headerButtons[i];
    currentButton.addEventListener("click", function() {
        uploadText(db); // If signed in, upload text before redirect to save data
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
// If webpage contains login buttons, add event listeners for login and signout buttons
if(document.getElementById("login_button")) {
    document.getElementById("login_button").addEventListener("click", function() {
        // Prompt for password then log in
        // DAKOTA: If you want to make a sleek modal, this would be the place
        const password = prompt("Password:");
        login(auth,password);
    });
    document.getElementById("signout_button").addEventListener("click", function() {
        signOutAndUpload(auth, db);
    });
}
// If webpage contains ticket form, add event listeners
if(document.getElementById("ticket_submit")) {
    document.getElementById("ticket_submit").addEventListener("click", function() {

        // Compile all textareas into one string "res"
        const texts = document.getElementsByTagName("textarea");
        let res = "";
        for(let i=0;i<texts.length;i++) {
            res+=texts[i].name;
            res+="\n";
            res+=texts[i].value;
            res+="\n\n";
        }
        // Upload "res" string to database
        addTicket(res).catch(err => {
            console.log(err);
        });
    });
}
// If webpage contains ticket content div, attempt to load tickets
if(document.getElementById("tickets")) {
    // Load ticket data from database. Rule permissions block non-authenticated users from accessing data.
    const docref = doc(db,"/tickets/","data");


    getDoc(docref)
        .then((snap) => {
            return snap.data();
        })
        .then((data) => {
            // For each ticket, create a <p> tag for it and append to content div
            data["list"].forEach(function(ticket) {
                const toAdd = document.createElement("p");
                toAdd.innerHTML=ticket;
                document.getElementById("tickets").appendChild(toAdd);
            });
        });
}
// For every webpage, add authentication change listener.
// This listener (found in stateChange.js) runs every time a user
//      1. Signs in
//      2. Signs out
//      3. Loads any page whatsoever
addStateChangeListener(auth,db);

// Helper function to add ticket to firestore
async function addTicket(res) {
    let ticketRef = doc(db,"/tickets/","data");
    await updateDoc(ticketRef, {
        "list": arrayUnion(res) // Use arrayUnion() to avoid reading data from firestore. Important for security.
    }).catch(err => {
        console.log(err);
    });
}