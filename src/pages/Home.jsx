import { useSelector } from "react-redux";
import { BlogCard } from "../components/BlogCard";

export const Home = () => {
  const posts = useSelector((state) => state.blogs.posts);

  return (
    <div>
      <h1>All Blogs</h1>
      <main className="grid  md:grid-cols-3  gap-4">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};
