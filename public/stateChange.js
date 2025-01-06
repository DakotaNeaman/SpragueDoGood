import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {importTextFromData,getFirestoreData,uploadText} from "./loadText.js";
import { doc, getDoc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

function addStateChangeListener(auth, db) {
    // Code to be ran every time a page is loaded
    auth.onAuthStateChanged(function(user) {
        // Load data from firestore into <p> tags
        getFirestoreData(db).then((data) => {
            return importTextFromData(data);
        }).then(() => {
            if (user) {
                document.getElementById("cad-tag").innerHTML="@SPRAGUE CAD: "+user.email;
                
                // If signed in user goes into submit ticket page, instead load submitted tickets
                if(document.getElementById("ticket_submit")) {
                    document.getElementById("content").innerHTML="";
                    document.querySelector(".selected").innerHTML="Ticket Reader";
                    
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
                                document.getElementById("content").appendChild(toAdd);
                            });
                        });
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