import {  createUserWithEmailAndPassword  } from "firebase/auth";
import { app, auth } from "@/firebaseConfig";
import { database } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
// This function is used to register a user with their email and password

export async function registerAction(data) {
    console.log('registerAction');
    console.log(data);
    return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
        //    Signed in
        const user = userCredential.user;
         console.log('----------------------------------');
         console.log(user);
         const uid = user.uid; 
        // ...
        const datRef = collection(database, "Finances");
        try {
            const docRef = await addDoc(datRef, {
                userid : uid,
                income : data.income,
                expenses : "0",
                transactions : [{timestamp: new Date(), amount: data.income, message: 'income', type: 'credit'}]
            });
            //console.log("Document written with ID: ", docRef.id);
            //console.log('----------------------------------');
            //console.log(auth);
            return { status: 200, userid: user.uid }; // Return the uid of the signed-in user
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('----------------------------------');
        console.log(errorCode, errorMessage);
        return { status: 400, message: errorMessage }; // Return an object with the status and message
        });
}