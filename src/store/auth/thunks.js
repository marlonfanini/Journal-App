import { singInWithGoogle, registerUserWithEmailPassword, logoutFirebase } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./Authslice"

export const checkingAuth = (email, password) => {
    return async(dispatch) => { 
            dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const result = await singInWithGoogle();
        
        if(!result.ok ) {
            dispatch(logout(result.errorMessage))
        } else 
        dispatch (login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
         dispatch(checkingCredentials()) 

         const resp = await registerUserWithEmailPassword({email, password, displayName})
         console.log(resp);
         if (!resp.ok) return dispatch (logout(result.errorMessage))
         dispatch(login)
    } 
}


export const startLoginWithEmailPassword = ({email, password} ) => {
    
    return async (dispatch) => {
    dispatch(checkingCredentials())

    const resp = await registerUserWithEmailPassword({email, password})
    if (!resp.ok) return dispatch (logout(resp.errorMessage))
    dispatch(login(resp))
}

} 

export const startLogOut = () => {
    return async (dispatch) => {
        await logoutFirebase()

        dispatch(logout())
    }
 }