import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { updatePost } from "../features/blogs/blogSlice";
import { useNotificationContext } from "../contexts/NotificationContext";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blogs.posts);
  const post = posts.find((p) => p.id === id);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { showNotification } = useNotificationContext();

  // Pre-populate form with existing blog data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setAuthor(post.author);
      setCategory(post.category);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !title.trim() ||
      !author.trim() ||
      !category.trim() ||
      !content.trim()
    ) {
      setError("All fields are required");
      showNotification("All fields are required", "error");
      return;
    }

    // Dispatch update action
    dispatch(
      updatePost({
        id,
        title,
        author,
        category,
        content,
      }),
    );

    // Clear error
    setError("");

    // Navigate to blog details
    navigate(`/${id}`);

    // Show success notification
    showNotification("Blog post updated successfully!", "success");
  };

  const handleCancel = () => {
    navigate(`/${id}`);
  };

  // Handle case when blog is not found
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card sx={{ maxWidth: 600, width: "100%", m: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>
              Blog not found
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card sx={{ maxWidth: 600, width: "100%" }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Blog Post
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              margin="normal"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Health & Fitness">Health & Fitness</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex gap-4 mt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update Post
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlog;
