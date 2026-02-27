import { Route, Routes } from "react-router-dom";
import { BlogDetails } from "./pages/BlogDetails";
import { Home } from "./pages/Home";
import { NewBlog } from "./pages/NewBlog";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/:id" element={<BlogDetails />} />
    </Routes>
  );
};
