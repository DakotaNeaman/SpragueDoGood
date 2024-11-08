import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getFirestore, collection, getDocs, doc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';
import { getStorage, ref, listAll, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js';




const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

