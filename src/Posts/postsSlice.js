import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: { createFormOpen: false, editFormOpen: false },
  reducers: {
    openCreateForm(state) {
      state.createFormOpen = true;
    },
    closeCreateForm(state) {
      state.createFormOpen = false;
    },
  },
});

export const { openCreateForm, closeCreateForm } = postsSlice.actions;

export default postsSlice.reducer;
