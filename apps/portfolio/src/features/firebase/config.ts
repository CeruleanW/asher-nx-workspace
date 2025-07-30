// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeqQEL_IdLRwOejvvJYRVO9kh5dgsfpgU",
  authDomain: "asher-personal-data.firebaseapp.com",
  projectId: "asher-personal-data",
  storageBucket: "asher-personal-data.appspot.com",
  messagingSenderId: "207151369114",
  appId: "1:207151369114:web:08b322bda7a0c430830823",
  measurementId: "G-G8F8JD6MBC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Create a child reference
const DATA_FOLDER = 'data';
export const personalDataRef = ref(storage, `${DATA_FOLDER}/personal-data.yaml`);
export const projectsDataRef = ref(storage, `${DATA_FOLDER}/projects.json`);
