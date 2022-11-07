import { apiSlice } from "../features/api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: (result = [], error, arg) => [
        "Post",
        ...result.map((post) => ({ type: "Post", id: post._id })),
      ],
    }),
    getCategories: builder.query({
      query: () => "/posts/categories",
    }),
    getPopularPosts: builder.query({
      query: () => "/posts/popularPosts",
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    getCategoryPosts: builder.query({
      query: (id) => `/posts/${id}/category`,
      providesTags: (result, error, arg) => [
        { type: "CategoryPosts", id: arg },
      ],
    }),
    getSearchedPosts: builder.query({
      query: (id) => `/posts/${id}/search`,
      providesTags: (result, error, arg) => [
        { type: "SearchedPosts", id: arg },
      ],
    }),
    getUserPosts: builder.query({
      query: (id) => `/posts/${id}/userPosts`,
      providesTags: (result = [], error, arg) => [
        "UserPosts",
        ...result.map((post) => ({ type: "UserPosts", id: post._id })),
      ],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "/posts/create",
        method: "POST",
        body: post,
      }),
      invalidatesTags: () => [{ type: "Post" }],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}/editPost`,
        method: "PATCH",
        body: post.formData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/deletePost`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    likePost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}/likePost`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.id },
        { type: "UserPosts", id: arg.id },
        { type: "CategoryPosts" },
        { type: "SearchedPosts" },
      ],
    }),
    commentPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}/commentPost`,
        method: "POST",
        body: post.data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetCategoriesQuery,
  useGetPopularPostsQuery,
  useGetPostQuery,
  useGetUserPostsQuery,
  useGetCategoryPostsQuery,
  useGetSearchedPostsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useCommentPostMutation,
} = postsApiSlice;
