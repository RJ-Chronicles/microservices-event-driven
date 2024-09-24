import { useState } from "react";
import axios from "axios";
const CreateComment = ({ postId }) => {
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://posts.com/posts/${postId}/comments`,
      {
        content,
      }
    );
    console.log(response);
    setContent("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment">New Comment</label>
          <input
            type="text"
            className="form-control"
            id="comment"
            aria-describedby="comment-help"
            placeholder="Add Content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <br />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
