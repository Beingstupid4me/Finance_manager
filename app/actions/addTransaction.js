import {auth, database} from "@/firebaseConfig";
import {collection, query, where, getDocs, doc, runTransaction, updateDoc} from "firebase/firestore";

export const addTransaction = async (data) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error('No user logged in');
        return { status: 400, message: 'No user logged in' };
    }
    const userId = currentUser.uid;
    const notesRef = collection(database, "Finances");
    const q = query(notesRef, where("userid", "==", userId));

    const time = new Date();
    // Get the documents that match the query
    const querySnapshot = await getDocs(q);
    const prev_value = querySnapshot.docs[0].data().transactions;
    const new_value = [...prev_value, {amount: data.amount, timestamp: time, message: data.description, type: data.transactionType}];
    const docRef = doc(database, "Finances", querySnapshot.docs[0].id);
    
    try {
        await runTransaction(database, async (transaction) => {
          const sfDoc = await transaction.get(docRef);
          if (!sfDoc.exists()) {
            throw "Document does not exist!";
          }
          transaction.update(docRef, { transactions: new_value });
        });
        console.log("Transaction successfully committed!");
        return { status: 200, message: 'Transaction successfully committed!', time: time};
      } catch (e) {
        console.log("Transaction failed: ", e);
        return { status: 400, message: e.message };
      }
};