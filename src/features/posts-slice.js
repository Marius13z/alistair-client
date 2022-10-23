import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  open: false,
  posts: [],
  categories: [],
  post: {},
  popularPosts: [],
  status: "pending",
  searchStatus: "pending",
  categoriesStatus: "pending",
  error: null,
};

// base url used for api fetch
export const API = axios.create({ baseURL: "http://localhost:5000" });

// displaying error text
const occuredError = "Something happened, please try again!";

// fetch all posts on feed
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const { data } = await API.get("/posts");
    return data;
  } catch (error) {
    toast.error(occuredError);
  }
});

// create a post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData) => {
    try {
      // make a request to db and get the data sent back from server
      const { data } = await API.post("/posts/create", formData);

      toast.success("You created a post!");

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

// delete a specific post based on id
export const deletePost = createAsyncThunk("posts/delete", async (id) => {
  try {
    await API.delete(`/posts/${id}/deletePost`);

    toast.success("You deleted a post!");

    return id;
  } catch (error) {
    toast.error(occuredError);
  }
});

// fetch all available categories on home page so user can filter posts based on category
export const fetchCategories = createAsyncThunk(
  "posts/fetchCategories",
  async () => {
    try {
      const { data } = await API.get("/posts/categories");

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

// fetch specific post based on post id
export const fetchPost = createAsyncThunk("posts/fetchPost", async (id) => {
  try {
    const { data } = await API.get(`/posts/${id}`);

    return data;
  } catch (error) {
    toast.error(occuredError);
  }
});

// like and dislike a specific post
export const likePost = createAsyncThunk("posts/likePost", async (data) => {
  try {
    const res = await API.patch(`/posts/${data.id}/likePost`, data);

    return res.data;
  } catch (error) {
    toast.error(occuredError);
  }
});

// edit post
export const editPost = createAsyncThunk("posts/editPost", async (data) => {
  try {
    await API.patch(`/posts/${data.id}/editPost`, data.formData);

    toast.success("You edited a post!");

    return { id: data.id, data: data.formData };
  } catch (error) {
    toast.error(occuredError);
  }
});

// fetch posts based on category
export const fetchCategoryPost = createAsyncThunk(
  "posts/fetchCategoryPost",
  async (id) => {
    try {
      const { data } = await API.get(`/posts/${id}/category`);

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

// fetch posts based on search
export const fetchSearchedPosts = createAsyncThunk(
  "posts/fetchSearchedPosts",
  async (id) => {
    try {
      const { data } = await API.get(`/posts/${id}/search`);

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

// fetch popular posts
export const fetchPopularPosts = createAsyncThunk(
  "posts/fetchPopularPosts",
  async () => {
    try {
      const { data } = await API.get(`/posts/popularPosts`);

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

// fetch user individual posts on his page
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (id) => {
    try {
      const { data } = await API.get(`/posts/${id}/userPosts`);

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async (postData) => {
    try {
      const { data } = await API.post(
        `/posts/${postData.id}/commentPost`,
        postData.data
      );

      return data;
    } catch (error) {
      toast.error(occuredError);
    }
  }
);

// posts slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    openForm(state) {
      state.open = !state.open;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = "succeeded";

        state.posts = payload.posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to get the posts!";
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.open = false;
        state.posts.unshift(payload);
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categoriesStatus = "succeeded";

        state.categories = payload.categories;
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        state.status = "succeeded";

        state.post = payload;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        const index = state.posts.findIndex((post) => post._id === payload);
        state.posts.splice(index, 1);
      })
      .addCase(likePost.fulfilled, (state, { payload }) => {
        state.posts.map((post) => {
          if (post._id === payload._id) {
            post.likes = payload.likes;
          }
          return post;
        });
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.posts.map((post) => {
          if (post._id === payload.id) {
            Object.assign(post, payload.data);
          }
          return post;
        });
      })
      .addCase(fetchCategoryPost.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(fetchCategoryPost.fulfilled, (state, { payload }) => {
        state.searchStatus = "succeeded";

        state.posts = payload;
      })
      .addCase(fetchSearchedPosts.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(fetchSearchedPosts.fulfilled, (state, { payload }) => {
        state.searchStatus = "succeeded";

        state.posts = payload;
      })
      .addCase(fetchPopularPosts.fulfilled, (state, { payload }) => {
        state.popularPosts = payload;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
        state.status = "succeeded";

        state.posts = payload;
      })
      .addCase(commentPost.fulfilled, (state, { payload }) => {
        state.post.comments = payload.comments;
      });
  },
});

export const { openForm } = postsSlice.actions;

export default postsSlice.reducer;
