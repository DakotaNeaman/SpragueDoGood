import { doc, getDoc,setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

async function getFirestoreData(db) {
    const docRef = doc(db,"/users/"+"3OepNADEYmYMzBwOtTSmtvbuoBL2");
    const snap = await getDoc(docRef);
    return snap.data();
}
async function uploadText(db) {
    const docRef = doc(db,"/users/"+"3OepNADEYmYMzBwOtTSmtvbuoBL2");
    const textAreas = document.getElementsByTagName("textarea");
    return getFirestoreData(db).then((snap) => {
        for(const area of textAreas) {
            snap[area.id]=area.value;
        }
        return snap;
    })
    .then((snap) => {
        return setDoc(docRef, snap);
    });
}
async function importTextFromData(data) {
    const textBoxes = document.getElementsByClassName("text");
    for(let i=0;i<textBoxes.length;i++) {
        let currentText = textBoxes[i];

        currentText.innerHTML=data[currentText.id];

    }
}
export {getFirestoreData,importTextFromData, uploadText};