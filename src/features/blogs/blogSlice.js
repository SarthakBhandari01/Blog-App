import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: "1",
      title: "Welcome Blog",
      content: "This is your first blog post.",
      likes: 0,
    },
    {
      id: "12",
      title: "Welcome Blog",
      content: "This is your first blog post.",
      likes: 0,
    },
    {
      id: "2",
      title: "Welcome Blog",
      content: "This is your first blog post.",
      likes: 0,
    },
    {
      id: "3",
      title: "Welcome Blog",
      content: "This is your first blog post.",
      likes: 0,
    },
    {
      id: "4",
      title: "Welcome Blog",
      content: "This is your first blog post.",
      likes: 0,
    },
    {
      id: "5",
      title: "Welcome Blog",
      content: "This is your first blog post.",
      likes: 0,
    },
    {
      id: "7",
      title: "Welcome Blog",
      content: "This is your first blog post.",
      likes: 0,
    },
    {
      id: "6",
      title: "Welcome Blog",
      author: "Sarthak Bhandari",
      category: "General",
      content: "This is your first blog post.",
      likes: 0,
    },
  ],
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

    deletePost: (state, action) => {
      const id = action.payload;
      state.posts = state.posts.filter((post) => post.id !== id);
    },
  },
});

export const { addPost, updatePost, likePost, deletePost } = blogSlice.actions;

export default blogSlice.reducer;
