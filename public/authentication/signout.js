import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

function signOutListener(auth) {
    document.getElementById("signout_button").addEventListener("click", () => {
        auth.signOut().then(() => {

        }).catch((err) => {
            console.log(err);
        });
    })
    
}
export {signOutListener};