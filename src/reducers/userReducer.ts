import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveState, loadState } from "../localStorage";
// Define the initial state
export type AuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  user: Login["user"] | null;
  token: string | null;
  message: string | null;
  error: string | null;
};

const initialState: AuthState =loadState()|| {
  loading: true,
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  message:null,
};

// Create a slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: Login["user"], token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;

      state.token = action.payload.token;
      state.error = null;
      saveState(state);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    registrationRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;

    },

    registrationSuccess: (state, action: PayloadAction<{ user: Login["user"], token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
       state.token = action.payload.token;
      state.error = null;
      saveState(state);
    },
    logoutSuccess: (state,action: PayloadAction<{ message:string}>) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.user=null;
      state.token=null;
      state.message=action.payload.message
      saveState(state);
    },
 

  },
});

// Export actions and reducer
export const { loginRequest, loginSuccess, loginFailure,registrationRequest,registrationSuccess,logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
