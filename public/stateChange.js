import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {importTextFromData,getFirestoreData,uploadText} from "./loadText.js";

function addStateChangeListener(auth, db) {
    // Code to be ran every time a page is loaded
    auth.onAuthStateChanged(function(user) {
        // Load data from firestore into <p> tags
        getFirestoreData(db).then((data) => {
            return importTextFromData(data);
        }).then(() => {
            if (user) {
                document.getElementById("cad-tag").innerHTML="@SPRAGUE CAD: "+user.email;
                
                // Add Ticket Reader button at top after sign-in
                if(!document.getElementById("read_ticket_button")) {
                    const readTicketButton = document.createElement("button");
                    readTicketButton.classList.add("header-button");
                    readTicketButton.classList.add((document.getElementById("tickets") ? "selected" : "unselected"));
                    readTicketButton.onclick = function() {
                        window.location.replace('ticket-reader.html');
                    }
                    readTicketButton.innerHTML="Ticket Reader";
                    readTicketButton.id="read_ticket_button";
                    document.getElementById("buttons-header").appendChild(readTicketButton);
                }
                
                // Replace all <p> tags with <textarea> tags so they can be editted
                const textBoxes = document.getElementsByClassName("text");
                for(let i=0;i<textBoxes.length;i++) {
                    let currentText = textBoxes[i];
                    const textarea = document.createElement('textarea');
                    textarea.id=currentText.id;
                    const content = currentText.textContent.replace(/<br>/g, '\n');
                    textarea.value = content;
                    textarea.classList.add('editor-textarea');
                    currentText.innerHTML = '';
                    currentText.appendChild(textarea);
                }
            } else {
                
            }
        });
    });
}
export {addStateChangeListener};