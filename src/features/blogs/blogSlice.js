import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const post = {
        id: nanoid(),
        title: action.payload.title,
        author: action.payload.author,
        category: action.payload.category,
        content: action.payload.content,
        likes: 0,
      };
      state.posts.push(post);
    },

    updatePost: (state, action) => {
      const { id, title, content, author, category } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.author = author;
        existingPost.category = category;
      }
    },

    likePost: (state, action) => {
      const id = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.likes += 1;
      }
    },

    unlikePost: (state, action) => {
      const id = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost && existingPost.likes > 0) {
        existingPost.likes -= 1;
      }
    },

    deletePost: (state, action) => {
      const id = action.payload;
      state.posts = state.posts.filter((post) => post.id !== id);
    },
  },
});

export const { addPost, updatePost, likePost, unlikePost, deletePost } =
  blogSlice.actions;

export default blogSlice.reducer;
