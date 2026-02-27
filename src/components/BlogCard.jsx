import { Link } from "react-router-dom";

export const BlogCard = ({ post }) => {
  return (
    <div className="bg-red-100">
      <h2>{post.title}</h2>
      <p>{post.content.substring(0, 300)}...</p>
      <Link to={`/${post.id}`}>Read More</Link>
    </div>
  );
};
