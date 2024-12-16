import { uploadText,getFirestoreData,importTextFromData } from "../loadText.js";

function signOutAndUpload(auth,db) {
    uploadText(db) // Upload current text to firestore 
    .then(() => { 
        return getFirestoreData(db); // Get text back from firestore
    }) 
    .then((data) => {
        return importTextFromData(data); // Load text from firestore
    })
    .then(() => {
        return auth.signOut(); // Sign out of auth. Triggers state change
    })
    .then(() => {
        document.getElementById("cad-tag").innerHTML="@SPRAGUE CAD";
    })
    .catch((err) => {
        console.log(err);
    });   
}
export {signOutAndUpload};