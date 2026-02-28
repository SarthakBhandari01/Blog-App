import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../features/blogs/blogSlice";

// Middleware to sync Redux state to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  try {
    localStorage.setItem("blogAppState", JSON.stringify(state.blogs));
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
  return result;
};

// Load state from localStorage on app initialization
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("blogAppState");
    if (serializedState === null) {
      return undefined; // Let Redux use initial state
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
  preloadedState: {
    blogs: loadState() || { posts: [] },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
