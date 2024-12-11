import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { uploadText,getFirestoreData,importTextFromData } from "../loadText.js";

function signOutAndUpload(auth,db) {
    // Upload text, then reload text from db into <p> tags, then signout.
    uploadText(db)
    .then(() => {
        return getFirestoreData(db);
    })
    .then((data) => {
        return importTextFromData(data);
    })
    .then(() => {
        return auth.signOut();
    })
    .then(() => {
        document.getElementById("cad-tag").innerHTML="@SPRAGUE CAD";
    })
    .catch((err) => {
        console.log(err);
    });   
}
export {signOutAndUpload};