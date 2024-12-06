import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: Boolean;
    userRole: String;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: "",
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
    },
    setRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});
export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;