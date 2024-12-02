import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { setDoc, collection,doc, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"; 

function registerListener(auth, db) {
    document.getElementById('submit_button').addEventListener('click', function(event) {
  
        const email = "colinnw15@gmail.com";
        const pass = "123456";
    
        // if(validate_email(email)==false || validate_password(pass)==false) {
        //     alert("Invalid username or password.");
        //     return;
        // }
    
        // if(validate_field(email)==false || validate_field(pass)==false) {
        //     alert("Please fill out required fields.");
        //     return;
        // }
    
        createUserWithEmailAndPassword(auth,email,pass)
        .then(async function(cred) {
            alert("Account Creation Successful!");
            try {
                const userRef = doc(collection(db, "users/"),cred.user.uid);
                const userDoc = await setDoc(userRef, {
                    email: email,
                    data: "colin was here"
                });
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        })
        .catch(function(error) {
    
            alert(error.message);
        });
      
    }); 
}
export {registerListener}