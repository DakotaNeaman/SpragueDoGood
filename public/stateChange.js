import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {importTextFromData,getFirestoreData,uploadText} from "./loadText.js";

function addStateChangeListener(auth, db) {
    auth.onAuthStateChanged(function(user) {
        getFirestoreData(db).then((data) => {
            return importTextFromData(data);
        }).then(() => {
            if (user) {
                document.getElementById("cad-tag").innerHTML="@SPRAGUE CAD: "+user.email;
                
                const readTicketButton = document.createElement("button");
                readTicketButton.classList.add("header-button");
                readTicketButton.classList.add((document.getElementById("tickets") ? "selected" : "unselected"));
                readTicketButton.onclick = function() {
                    window.location.replace('ticket-reader.html');
                }
                readTicketButton.innerHTML="Ticket Reader";
                document.getElementById("buttons-header").appendChild(readTicketButton);
    
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