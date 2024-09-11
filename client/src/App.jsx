import { useState } from "react";
import { CreatePost, PostsList } from "./componets";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>Create Post</h1>
      <CreatePost />
      <hr />
      <h1>Posts</h1>
      <PostsList />
    </div>
  );
}

export default App;
