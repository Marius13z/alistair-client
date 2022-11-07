import { apiSlice } from "../features/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, arg) => [
        "Users",
        ...result.map((user) => [{ type: "Users", id: user._id }]),
      ],
    }),
    getUser: builder.query({
      query: () => `/user`,
      providesTags: ["User"],
    }),
    getUserProfile: builder.query({
      query: (id) => `user/${id}/profile`,
      providesTags: (result, error, arg) => [{ type: "UserProfile", id: arg }],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/signin",
        method: "POST",
        credentials: "include",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signinWithGoogle: builder.mutation({
      query: (credentials) => ({
        url: "/user/signinWithGoogle",
        method: "POST",
        credentials: "include",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/user/signup",
        method: "POST",
        credentials: "include",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: (id) => ({
        url: "/user/signout",
        method: "POST",
        body: id,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    followUser: builder.mutation({
      query: (user) => ({
        url: "/user/follow",
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Users" },
        { type: "UserProfile" },
      ],
    }),
    editUserDescription: builder.mutation({
      query: (user) => ({
        url: `/user/${user.id}/editDescription`,
        method: "PATCH",
        body: user.description,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "UserProfile", id: arg.id },
      ],
    }),
    editUserImage: builder.mutation({
      query: (user) => ({
        url: "user/editImage",
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "UserProfile", id: arg.id },
        { type: "User" },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useFollowUserMutation,
  useEditUserDescriptionMutation,
  useSignInMutation,
  useLoginMutation,
  useGetUserProfileQuery,
  useEditUserImageMutation,
  useRegisterMutation,
  useLogoutMutation,
  useSigninWithGoogleMutation,
} = userApiSlice;

// await API.post("/user/signup", formData);
