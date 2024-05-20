import {createSlice} from "@reduxjs/toolkit";
import  jwt_decode from 'jwt-decode';

const authSlice=createSlice({
    name:"Auth",
    initialState:{
     authData:null,
     error:''
    },
    //we can do this,since redux toolkit will take of this mutable methods.
    reducers:{
        authenticate(state,action){
          const token=action.payload;
          const result=jwt_decode(token);
          const objInfo={
            result,
            token
          }
          localStorage.setItem('profile',JSON.stringify(objInfo));
          state.authData={...objInfo};
        },
        logout(state,action){
          localStorage.clear();
          state.authData=null;
        },
        manualAuthenticate(state,action){
          localStorage.setItem('profile',JSON.stringify(action.payload));
          state.authData=action?.payload;
        },
        error(state,action){
          state.error=action.payload;
        }
    }
});

export const authActions=authSlice.actions;
export default authSlice;