import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmUUH2ntAgbioVMwGiqszeFepZ_-PhqjU",
  authDomain: "agrawa-d1c62.firebaseapp.com",
  projectId: "agrawa-d1c62",
  storageBucket: "agrawa-d1c62.appspot.com",
  messagingSenderId: "580599641566",
  appId: "1:580599641566:web:2ac761e9284b6bcf10994f",
  measurementId: "G-35P0B7XXKN",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const employeesColRef = collection(db, "employees");
export default employeesColRef;
