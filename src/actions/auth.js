import * as api from '../api/index.js';
import { authActions } from '../store/AuthSlice.js';

export const signin=(formData,navigate)=>{
    return async(dispatch)=>{
       try {
        //log in the user
        const {data}=await api.signIn(formData);
        if(data.error){
            dispatch(authActions.error(data.error));
            return;
        }
        dispatch(authActions.error(''));
        dispatch(authActions.manualAuthenticate(data));
        navigate("/");  
       } catch (error) {
        console.log(error);
       }
    }
}
export const signup=(formData,navigate)=>{
    return async(dispatch)=>{
       try {
        const {data}=await api.signUp(formData);
        if(data.error){
            dispatch(authActions.error(data.error));
            return;
        }
        dispatch(authActions.error(''));
        dispatch(authActions.manualAuthenticate(data));
        navigate("/");
       } catch (error) {
        console.log(error);
       }
    }
}