// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhakEXj-76wuaKpZsHWBao23VbkbDlZ3Y",
  authDomain: "mitienda-2f3cb.firebaseapp.com",
  projectId: "mitienda-2f3cb",
  storageBucket: "mitienda-2f3cb.appspot.com",
  messagingSenderId: "389743102571",
  appId: "1:389743102571:web:fb1c76dd0e6d7b8d9d7f2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Save products
export const saveTask = (producto, descripcion, precio) => {
  addDoc(collection(db, "tienda"), {
    producto: producto,
    descripcion: descripcion,
    actualizar: precio,
  });
};

// Get product list
export const getTasks = () => getDocs(collection(db, "tienda"));

// Get product list in changed live elements
export const onChangedTask = (callback) =>
  onSnapshot(collection(db, "tienda"), callback);

// Delete elements in list
export const deleteTask = (id) => deleteDoc(doc(db, "tienda", id));

// Update element in list
export const getTask = (id) => getDoc(doc(db, "tienda", id));
export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tienda", id), newFields);
