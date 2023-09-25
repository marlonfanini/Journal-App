import { async } from "@firebase/util";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider (); 

export const singInWithGoogle =  async() => {
    try {
        const result = await signInWithPopup (FirebaseAuth, googleProvider)
        const {displaName, email, photoURL, uid } = result.user; 
        
        return {
            ok: true, 
            displaName, email, photoURL, uid
        }
    } catch ( error ) {
        const errorCode = error.code; 
        const errorMessage = error.errorMessage;
        return{
            ok: false,
            errorMessage
        }
        
    }
 }

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password )      
        const {uid, photoURL} = resp.user;


    } catch (error) {
        return {ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async({email, password}) => {
    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password )
        const {uid, photoURL, displaName} = resp.user

        return {
            ok: true,
            uid, photoURL, displaName
        }

    } catch (error) {
        console.log(error)
        return {ok: false, errorMessage: error.message }
    } 
}


export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}