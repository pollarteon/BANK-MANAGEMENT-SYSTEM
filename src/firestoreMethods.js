import { collection, addDoc ,query,where} from "firebase/firestore";
import { db } from "./firebase";
import { getAuth } from "firebase/auth"
import { getDocs, doc } from "firebase/firestore";


export const fetchClient = async()=>{
    const auth = getAuth();
    const currentUser = auth.currentUser;
    console.log(currentUser);
   

    const uid = currentUser.uid; // Firebase Auth UID
    
    try {
        // Step 1: Fetch client data from Firestore
        const userCollectionRef = collection(db, "clients");
        const clientDocRef = query(userCollectionRef, where("uid", "==", uid));
        const clientDocs = await getDocs(clientDocRef);

        if (clientDocs.empty) {
            alert("Client data not found in Firestore. Please contact support.");
            return;
        }

        const clientData = clientDocs.docs[0].data(); // Data for the current user
        console.log(clientData);
        return clientData;
    }catch(e){
        console.error("Error");
        console.log(e);
    }
}
