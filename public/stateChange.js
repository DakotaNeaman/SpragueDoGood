import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
function addStateChangeListener(auth) {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("cad-tag").innerHTML="@SPRAGUE CAD: "+user.email;
        } else {
            document.getElementById("cad-tag").innerHTML="@SPRAGUE CAD";
        }
    });
}
export {addStateChangeListener};