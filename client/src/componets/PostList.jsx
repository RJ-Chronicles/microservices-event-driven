import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import CommentList from "./CommentList";
import CreateComment from "./CreateComment";

const PostsList = () => {
  const [posts, setPosts] = useState({});
  const fetchPosts = useCallback(async () => {
    const res = await axios.get("http://posts.com/posts");
    console.log(res.data);
    setPosts(res.data);
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  console.log(posts);
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CreateComment postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostsList;
