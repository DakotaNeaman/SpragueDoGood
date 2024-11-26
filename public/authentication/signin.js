import { doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

function login(auth, password) {
    const email = "colinnw15@gmail.com";
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth,email,password)
        })
        .then(() => {
            // Run code here if you want something to happen after signin
        })
        .catch((err) => {
            console.log(err);
        })
}
export{login};