import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface AuthState {
  username: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  username: null,
  accessToken: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ username: string; accessToken: string }>
    ) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: action.payload.username,
          acceeToken: action.payload.accessToken,
        })
      );
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
    },
    logout : (state)=>{
        localStorage.clear();
        state.username = null;
        state.accessToken = null;
    },
  },
});
export const selectAuth = (state : RootState) => state.auth;

export const {setUser, logout} = authSlice.actions;

export default authSlice.reducer;