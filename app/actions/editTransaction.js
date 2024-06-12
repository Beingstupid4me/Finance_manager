import {auth, database} from "@/firebaseConfig";
import {collection, query, where, getDocs, doc, runTransaction, updateDoc} from "firebase/firestore";

export const editTransaction = async (data) => {
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
    for (let i = 0; i < prev_value.length; i++) {
        if (Number(prev_value[i].timestamp) === Number(time)) {
            prev_value[i] = {amount: data.amount, timestamp: time, message: data.description, type: data.transactionType};
            break;
        }
    }
    const docRef = doc(database, "Finances", querySnapshot.docs[0].id);
    
    try {
        await runTransaction(database, async (transaction) => {
          const sfDoc = await transaction.get(docRef);
          if (!sfDoc.exists()) {
            throw "Document does not exist!";
          }
          transaction.update(docRef, { transactions: prev_value });
        });
        console.log("Transaction successfully editted!");
        return { status: 200, message: 'Transaction successfully editted!', time: time};
      } catch (e) {
        console.log("Transaction failed: ", e);
        return { status: 400, message: e.message };
      }
};