import { useState } from "react";
import axios from "axios";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/posts/", {
        title,
      });
      console.log(response);
      setTitle("");
    } catch (err) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder="Add post"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
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

export default CreatePost;
