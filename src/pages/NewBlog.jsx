import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { addPost } from "../features/blogs/blogSlice";
import { useNotificationContext } from "../contexts/NotificationContext";

export const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { showNotification } = useNotificationContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log("Reached here");
      showNotification("All fields are required", "error");
      return;
    }

    // Dispatch action
    dispatch(
      addPost({
        title,
        author,
        category,
        content,
      }),
    );

    // Clear form
    setTitle("");
    setAuthor("");
    setCategory("");
    setContent("");
    setError("");

    // Navigate to home
    navigate("/");

    showNotification("Blog post created successfully!", "success");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card sx={{ maxWidth: 600, width: "100%" }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Blog Post
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
                Create Post
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
