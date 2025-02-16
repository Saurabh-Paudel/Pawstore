import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null,
  role: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).role
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
