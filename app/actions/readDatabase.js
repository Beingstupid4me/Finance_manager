import {auth, database} from "@/firebaseConfig";
import {collection, query, where, getDocs, doc, runTransaction, updateDoc} from "firebase/firestore";

export const getRecordsByUserId = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error('No user logged in');
        console.log(auth.currentUser)
        return;
    }
    const userId = currentUser.uid;
    const notesRef = collection(database, "Finances");
    const q = query(notesRef, where("userid", "==", userId));

    // Get the documents that match the query
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
};