import { createSlice } from "@reduxjs/toolkit";


const initialState={
    loading:false,
    error:null,
    currentUser:null
}

const userSlice=createSlice(
    {
        name:'user',
        initialState,
        reducers:{
            signInStart:(state)=>{
            state.loading=true;
            },
        signInSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.currentUser=action.payload;
        },
        signInFaliure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.currentUser=null;
        }
        
        }
    }
)

export const {signInFaliure, signInStart, signInSuccess} =userSlice.actions;
export default userSlice.reducer;