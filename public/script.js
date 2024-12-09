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


for (let i = 0; i < headerButtons.length; i++) {
    let currentButton = headerButtons[i];
    currentButton.addEventListener("click", function() {
        uploadText(db);
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
if(document.getElementById("login_button")) {
    document.getElementById("login_button").addEventListener("click", function() {
        const password = prompt("Password:");
        login(auth,password);
    });
    document.getElementById("signout_button").addEventListener("click", function() {
        signOutAndUpload(auth, db);
    });
}
if(document.getElementById("ticket_submit")) {
    document.getElementById("ticket_submit").addEventListener("click", function() {
        const texts = document.getElementsByTagName("textarea");
        let res = "";
        for(let i=0;i<texts.length;i++) {
            res+=texts[i].name;
            res+="\n";
            res+=texts[i].value;
            res+="\n\n";
        }
        
        addTicket(res).then(

        ).catch(err => {
            console.log(err);
        });
    });
}
if(document.getElementById("tickets")) {
    // Load ticket data from database. Rule permissions block non-authenticated users from accessing data.
    const docref = doc(db,"/tickets/","data");

    getDoc(docref)
        .then((snap) => {
            return snap.data();
        })
        .then((data) => {
            console.log(data);
            console.log("---");
            data["list"].forEach(function(ticket) {
                const toAdd = document.createElement("p");
                console.log(ticket);
                toAdd.innerHTML=ticket;
                document.getElementById("tickets").appendChild(toAdd);
            });
        });
}
addStateChangeListener(auth,db);

async function addTicket(res) {
    let ticketRef = doc(db,"/tickets/","data");
    await updateDoc(ticketRef, {
        "list": arrayUnion(res)
    }).catch(err => {
        console.log(err);
    });
}