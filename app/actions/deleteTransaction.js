import {auth, database} from "@/firebaseConfig";
import {collection, query, where, getDocs, doc, runTransaction, updateDoc} from "firebase/firestore";

export const deleteTransaction = async (data) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error('No user logged in');
        return { status: 400, message: 'No user logged in' };
    }
    const userId = currentUser.uid;
    const notesRef = collection(database, "Finances");
    const q = query(notesRef, where("userid", "==", userId));

    const time = data.timestamp;
    // Get the documents that match the query
    const querySnapshot = await getDocs(q);
    const prev_value = querySnapshot.docs[0].data().transactions;
    const new_value = prev_value.filter((item) => Number(item.timestamp) !== Number(time));
    const docRef = doc(database, "Finances", querySnapshot.docs[0].id);
    
    try {
        await runTransaction(database, async (transaction) => {
          const sfDoc = await transaction.get(docRef);
          if (!sfDoc.exists()) {
            throw "Document does not exist!";
          }
          transaction.update(docRef, { transactions: new_value });
        });
        console.log("Transaction successfully Deleted!");
        return { status: 200, message: 'Transaction successfully deleted!', time: time};
      } catch (e) {
        console.log("Transaction failed: ", e);
        return { status: 400, message: e.message };
      }
};