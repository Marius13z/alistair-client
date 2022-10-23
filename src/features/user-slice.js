import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { API } from "./posts-slice";

const initialState = {
  loggedIn: false,
  users: [],
  user: {},
  userStatus: "pending",
};

const occuredError = "Something happened, please try again!";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (username) => {
    try {
      const { data } = await API.get(`/user/${username}`);

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (userData) => {
    try {
      const { data } = await API.patch("/user/follow", userData);

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

export const fetchUser = createAsyncThunk("user/fetchUser", async (id) => {
  try {
    const { data } = await API.get(`/user/${id}/profile`);

    return data;
  } catch (error) {
    toast.error(occuredError);
  }
});

// send user description and modify it's state on UI
export const editUserDescription = createAsyncThunk(
  "user/editUserDescription",
  async (userData) => {
    try {
      const { data } = await API.patch(
        `/user/${userData.id}/editDescription`,
        userData.descriptionForm
      );

      toast.success("Your description was edited");

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

// sign up and sign in user user
export const signUp = createAsyncThunk("user/signUp", async (formData) => {
  try {
    const { data } = await API.post("/user/signup", formData);

    return data;
  } catch (error) {
    toast.error(occuredError);
  }
});

// sign up and sign in user user
export const signIn = createAsyncThunk("user/signIn", async (formData) => {
  try {
    const { data } = await API.post("/user/signin", formData);

    return data;
  } catch (error) {
    console.log(error);
  }
});

// edit user image
export const editUserImage = createAsyncThunk(
  "user/editImage",
  async (userData) => {
    try {
      const { data } = await API.patch(`/user/editImage`, userData);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logout
    logout(state) {
      state.loggedIn = false;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.userStatus = "succeeded";

        state.users = payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.users = state.users.filter((user) => user._id !== payload._id);

        state.user.followers = payload.followers;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.userStatus = "succeeded";

        state.user = payload[0];
      })
      .addCase(editUserDescription.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        localStorage.setItem("userInfo", JSON.stringify(payload.result));
        state.loggedIn = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        localStorage.setItem("userInfo", JSON.stringify(payload.result));
        state.loggedIn = true;
      })
      .addCase(editUserImage.fulfilled, (state, { payload }) => {
        state.user.image = payload.image;
      });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
