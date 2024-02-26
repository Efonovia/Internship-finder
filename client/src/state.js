import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  applications: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setUser: (state, action) => {
        state.user = action.payload.user;
    },

    updateSavedCompanies: (state, action) => {
      const { companyId, addToSaved } = action.payload;
      if (addToSaved) {
        state.user = {
          ...state.user,
          savedCompanies: [...state.user.savedCompanies, companyId]
        }
      } else {
        state.user = {
          ...state.user,
          savedCompanies: state.user.savedCompanies.filter(id => id !== companyId)
        }
      }
    },

    setApplications: (state, action) => {
        state.applications = action.payload.applications;
    },

  },
});

export const { setMode, setUser, setLoggedIn, setApplications, updateSavedCompanies } = authSlice.actions;
export default authSlice.reducer; 