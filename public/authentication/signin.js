import { doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

function loginListener(auth, db) {
    document.getElementById('login_button').addEventListener('click', function(event) {
        const email = "colinnw15@gmail.com";
        const pass = prompt("Password:");
        
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth,email,pass)
                    .then(async (cred) => {
                        const docRef = doc(collection(db,"users/"),cred.user.uid);
                        
                        

                    })
                    .catch((err)=> {
                        if(err.code=="auth/invalid-credential") {
                            alert("Incorrect username and/or password.");
                        }

                    });
            })
            .catch((error) => {
                console.log(error);
            });
        
    });
}
export{loginListener};