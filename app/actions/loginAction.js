import { signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "@/firebaseConfig";

// This function is used to sign in a user with their email and password

export async function loginAction(data) {
    console.log('loginAction');
    try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        // Signed in 
        const user = userCredential.user;
        // console.log('----------------------------------');
        // console.log(user);
        //auth.currentUser = user;
        console.log('----------------------------------');
        console.log(auth.currentUser);
        console.log('----------------------------------');
        console.log(auth)
        return { status: 200, userid:user.uid}; // Return the uid of the signed-in user
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('----------------------------------');
        console.log(errorCode, errorMessage);
        // throw error; // Throw the error so it can be handled by the caller
        return { status: 400, message: errorMessage }; // Return an object with the status and message
    }
}
