1.  How does react works?
2.  How may types of DOM in react?
3.  What is hooks in React. Explain built-in hooks
4.  What is dependancy array? Why do we use it?
5.  In React list, why do we use key props?
6.  What is redux?
7.  Explain React router
8.  Explain Authentication and Authorization in react
9.  What is Hihger Order component (HOC) in react?
10. client side rendering vs server side rendering?
11. Form validation program. Use basec inline css, flexbox, and onChange, onBlur events for validation

Here are the in-depth answers to your questions about React:

### 1) **How does React work?**

React is a JavaScript library for building user interfaces, particularly single-page applications (SPAs). It is based on the concept of components. These components allow you to break down the UI into independent, reusable pieces that can be composed to build complex interfaces.

- **Virtual DOM**: React uses a Virtual DOM to enhance performance. Instead of manipulating the actual DOM directly, React creates a virtual copy of it. When the state of an object changes, React updates only the necessary parts in the real DOM by comparing the virtual and real DOM.
- **Declarative Syntax**: React's declarative nature allows developers to describe what the UI should look like at any given time, and React handles the rendering updates.

React works by:

- Declaring components using JSX (HTML-like syntax in JavaScript).
- Using state and props to manage data within and across components.
- Efficiently rendering updates using its reconciliation algorithm and Virtual DOM.

### 2) **How many types of DOM in React?**

In React, there are two types of DOM:

- **Real DOM**: The actual browser's DOM, which is a tree structure representing the HTML elements.
- **Virtual DOM**: A lightweight, in-memory representation of the actual DOM. React maintains this virtual version of the DOM to improve performance by minimizing direct manipulations of the real DOM.

React updates the Virtual DOM when a component's state or props change. Then, React compares it with the previous version of the Virtual DOM (called "reconciliation") and only updates the real DOM where necessary.

### 3) **What are Hooks in React? Explain built-in hooks**

Hooks in React are functions that allow you to use React features (like state and lifecycle methods) in functional components. Prior to hooks, these features were only available in class-based components.

Common built-in hooks:

- **useState**: Allows you to add state to a functional component.
  ```js
  const [count, setCount] = useState(0);
  ```
- **useEffect**: Handles side effects (like fetching data, subscriptions) in functional components. It runs after the render and can optionally clean up side effects.
  ```js
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup logic
    };
  }, [dependency]);
  ```
- **useContext**: Consumes context in functional components, replacing `Context.Consumer`.
- **useReducer**: Manages complex state logic using a reducer function, useful for handling multiple or deeply nested states.
- **useRef**: Accesses DOM elements or persists values between renders without causing a re-render.
- **useMemo**: Memorizes expensive function results and recomputes them only when dependencies change.
- **useCallback**: Memorizes functions and avoids unnecessary re-creation on each render.

### 4) **What is the Dependency Array? Why do we use it?**

The dependency array is the second argument passed to `useEffect`, `useMemo`, or `useCallback` hooks. It tells React when to run or re-run the effect or when to memoize a function/variable.

- **Why use it?**: The dependency array optimizes performance by preventing unnecessary re-execution of effects or recalculations when dependencies haven't changed. Without it, the effect would run after every render, potentially leading to performance issues.

Example:

```js
useEffect(() => {
  // Effect logic
}, [dependency1, dependency2]); // Runs only when dependency1 or dependency2 changes.
```

### 5) **In React list, why do we use key props?**

The `key` prop is a unique identifier for list elements in React. It helps React efficiently update and reorder elements in the DOM.

- **Why use it?**: React uses keys to track which items have changed, been added, or removed. Without keys, React re-renders all items, causing performance issues and potential bugs. The key helps identify the element uniquely and ensure efficient updates.

Example:

```js
{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}
```

### 6) **What is Redux?**

Redux is a state management library for JavaScript applications, commonly used with React. It centralizes the entire application state in a single store and allows components to subscribe to specific pieces of the state.

- **Core Concepts**:
  - **Store**: Holds the entire state of the application.
  - **Actions**: Descriptions of what happened (e.g., a button was clicked).
  - **Reducers**: Pure functions that take the current state and an action, and return the new state.
  - **Dispatch**: Sends actions to reducers to update the store.

Redux helps manage complex state across many components by ensuring a predictable and traceable state flow.

### 7) **Explain React Router**

React Router is a library for handling navigation in React applications. It allows you to create routes for different components and display them based on the URL.

- **Routing Components**:
  - **BrowserRouter**: Provides routing functionality for web apps.
  - **Route**: Defines a mapping between the URL path and the component.
  - **Link**: Renders links to different routes.
  - **Switch**: Ensures that only one route is rendered at a time.

Example:

```js
<BrowserRouter>
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </Switch>
</BrowserRouter>
```

### 8) **Explain Authentication and Authorization in React**

- **Authentication**: Verifying the identity of a user (e.g., login).
- **Authorization**: Checking what actions or resources the authenticated user has permission to access.

In React, authentication is typically managed using libraries like Firebase, Auth0, or JWT. Authorization involves restricting certain routes or actions based on the user’s roles/permissions.

Example of protected route:

```js
<Route
  path="/dashboard"
  render={() =>
    user.isAuthenticated ? <Dashboard /> : <Redirect to="/login" />
  }
/>
```

### 9) **What is a Higher-Order Component (HOC) in React?**

A Higher-Order Component is a function that takes a component and returns a new component with additional props or functionality. It allows for code reuse and logic sharing between components.

Example:

```js
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    return props.isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    );
  };
}
```

### 10) **Client-Side Rendering (CSR) vs Server-Side Rendering (SSR)**

- **CSR (Client-Side Rendering)**: Rendering happens in the browser after the initial page load. React uses this approach by default. This method can lead to a slower initial load but provides faster interactions after the app is fully loaded.
- **SSR (Server-Side Rendering)**: Rendering happens on the server, and the fully rendered HTML is sent to the client. The client can see the content immediately, but the interactive elements are only available once JavaScript loads and runs. Frameworks like Next.js enable SSR for React.

### 11) **Form Validation Program using Inline CSS, Flexbox, onChange, and onBlur Events**

Here's an example of a simple form validation program:

```jsx
import React, { useState } from "react";

function FormValidation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const validate = (name, value) => {
    let error = "";
    if (name === "name" && value.length < 3) {
      error = "Name must be at least 3 characters";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Email is invalid";
    } else if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "0 auto",
      }}
    >
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          padding: "8px",
          marginBottom: "5px",
          borderColor: errors.name ? "red" : "black",
        }}
      />
      {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          padding: "8px",
          marginBottom: "5px",
          borderColor: errors.email ? "red" : "black",
        }}
      />
      {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          padding: "8px",
          marginBottom: "5px",
          borderColor: errors.password ? "red" : "black",
        }}
      />
      {errors.password && (
        <small style={{ color: "red" }}>{errors.password}</small>
      )}

      <button
        type="submit"
        style={{ padding: "10px", backgroundColor: "blue", color: "white" }}
      >
        Submit
      </button>
    </div>
  );
}

export default FormValidation;
```

This simple form validates the input fields and provides feedback based on validation conditions using `onChange` and `onBlur` events.

1.  How does node works?
2.  Why do use express framework?
3.  Explain middleware in express?
4.  Explain body-parser middleware?
5.  Explain path param vs query params. How to get those?
6.  app.get vs app.use
7.  Explain routing in express?
8.  How to handle authentication and authrization in express?
9.  NoSql vs SQL
10. Join two table
11. Coding best practice for node and react (like esLint)?

### 1) **How does Node.js work?**

Node.js is a runtime environment built on the Chrome V8 JavaScript engine, allowing developers to write server-side code in JavaScript. It operates using an **event-driven, non-blocking I/O model**, making it efficient for handling asynchronous operations like reading/writing files, making network requests, or accessing databases.

Key points about how Node.js works:

- **Single-threaded Event Loop**: Node.js operates on a single thread, handling multiple I/O operations asynchronously using a callback mechanism. The event loop continuously checks for tasks, processes them, and calls the corresponding callbacks.
- **Non-blocking I/O**: It allows the server to handle many requests at once without waiting for one operation to complete before moving on to the next.
- **Asynchronous execution**: Node.js uses asynchronous programming with callbacks, promises, or async/await, allowing tasks to run in the background while performing other operations.

### 2) **Why do we use the Express framework?**

Express is a minimalist web framework for Node.js that provides essential tools and features for building robust web and API applications.

Reasons to use Express:

- **Routing**: Simplifies handling different HTTP requests such as GET, POST, PUT, DELETE with `app.get()`, `app.post()`, etc.
- **Middleware**: Allows for easy use of middleware functions for handling requests, responses, and other processing steps.
- **Templating**: Supports templating engines like EJS or Pug to dynamically render HTML.
- **Modularity**: It is unopinionated, which means developers can structure applications in a flexible way.

Express streamlines web development with Node.js by offering a straightforward interface for handling HTTP requests and integrating middleware, making development faster and more manageable.

### 3) **Explain middleware in Express**

Middleware in Express is a function that has access to the request object (`req`), the response object (`res`), and the `next` function in the application’s request-response cycle. Middleware functions can:

- Execute code.
- Modify the request or response object.
- End the request-response cycle.
- Call the next middleware in the stack using `next()`.

Example of a simple middleware:

```js
app.use((req, res, next) => {
  console.log("Middleware executed");
  next(); // Calls the next middleware or route handler
});
```

Types of middleware:

- **Application-level middleware**: Bound to an instance of `app`.
- **Router-level middleware**: Bound to an instance of `express.Router()`.
- **Error-handling middleware**: Has four arguments, and it is used for handling errors.
- **Built-in middleware**: Provided by Express, such as `express.json()` or `express.static()`.

### 4) **Explain body-parser middleware**

`body-parser` is middleware used to parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.

Example:

```js
const bodyParser = require("body-parser");

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
```

With body-parser:

- **JSON parsing**: Parses JSON-formatted request bodies (like those from POST requests).
- **URL-encoded data**: Parses data sent using `application/x-www-form-urlencoded`.

Express has its own built-in body-parser as part of the core package in recent versions (`express.json()`, `express.urlencoded()`).

### 5) **Path Params vs Query Params. How to get those?**

- **Path parameters**: Part of the URL that typically represents the resource or identifier in a RESTful API. They are embedded directly into the URL path.
  Example: `/users/:id` where `id` is the path parameter.

  You can access them using:

  ```js
  app.get("/users/:id", (req, res) => {
    const userId = req.params.id; // Accessing path param
    res.send(`User ID: ${userId}`);
  });
  ```

- **Query parameters**: Passed as key-value pairs in the URL after a `?`, typically used for filtering or pagination.
  Example: `/users?page=2&limit=10` where `page` and `limit` are query parameters.

  You can access them using:

  ```js
  app.get("/users", (req, res) => {
    const page = req.query.page; // Accessing query params
    const limit = req.query.limit;
    res.send(`Page: ${page}, Limit: ${limit}`);
  });
  ```

### 6) **app.get vs app.use**

- **`app.get()`**: Defines a route to handle GET requests at a specific URL. It’s used for creating route handlers for specific paths and HTTP methods.
  Example:

  ```js
  app.get("/users", (req, res) => {
    res.send("Handle GET requests to /users");
  });
  ```

- **`app.use()`**: Mounts middleware to be executed regardless of the HTTP method and for any route that matches the given path.
  Example:
  ```js
  app.use((req, res, next) => {
    console.log("This middleware will run for every request");
    next();
  });
  ```

### 7) **Explain Routing in Express**

Routing in Express is how you define endpoints to handle client requests for various HTTP methods (GET, POST, PUT, DELETE, etc.). Routes specify a URL and the corresponding handler function to execute when a matching request is made.

Example of basic routing:

```js
app.get("/users", (req, res) => {
  res.send("Get all users");
});

app.post("/users", (req, res) => {
  res.send("Create a new user");
});
```

**Routing features**:

- **Route Parameters**: Parameters passed via the URL path.
- **Route Handling**: You can define multiple route handlers for the same route using middleware.
- **Router**: Express provides `express.Router()` to modularize route definitions.

### 8) **How to handle Authentication and Authorization in Express**

- **Authentication**: Verifying the identity of the user (e.g., via login with username/password or tokens like JWT).
- **Authorization**: Verifying that the authenticated user has permission to access a resource.

**Handling Authentication**:
You can use `jsonwebtoken` for JWT authentication. Middleware checks the validity of the token before allowing access to protected routes.

Example using JWT for authentication:

```js
const jwt = require("jsonwebtoken");

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}

app.get("/protected", authenticateToken, (req, res) => {
  res.send("Access granted to protected route");
});
```

For **authorization**, you can add roles or permissions as part of the user object or token payload and verify those against protected routes.

### 9) **NoSQL vs SQL**

- **SQL (Relational Databases)**: Structured databases that use tables to store data. Data is organized into rows and columns, and relationships between tables are enforced using foreign keys.

  - Examples: MySQL, PostgreSQL, SQLite.
  - **Use Case**: Complex queries, transactional applications where data consistency is critical.

- **NoSQL (Non-Relational Databases)**: Flexible databases that store data in various formats (documents, key-value pairs, graphs). They are schema-less, allowing for quick adaptation of data structures.
  - Examples: MongoDB, CouchDB, Redis.
  - **Use Case**: Large volumes of unstructured data, scalability, and fast access.

### 10) **Join two tables in SQL**

A SQL JOIN is used to combine rows from two or more tables based on a related column.

Example of an INNER JOIN:

```sql
SELECT employees.name, departments.department_name
FROM employees
INNER JOIN departments ON employees.department_id = departments.id;
```

This query fetches employees along with their department names by joining the `employees` table and `departments` table using `department_id`.

### 11) **Coding best practices for Node and React (like ESLint)**

- **Code Linting**: Use tools like **ESLint** to enforce consistent coding styles and catch syntax issues early.

  - Install ESLint: `npm install eslint --save-dev`.
  - Setup configuration with `.eslintrc` to enforce rules for both React and Node.js codebases.

- **Modular Code Structure**: Break down code into smaller, reusable modules or components. For Node.js, follow the separation of concerns by organizing routes, controllers, services, and models.

- **Consistent Naming Conventions**: Use camelCase for variables, PascalCase for React components, and follow a consistent naming scheme for files and folders.

- **Version Control**: Use Git effectively, with meaningful commit messages and frequent commits.

- **Error Handling**: In Node.js, always handle errors gracefully using `try-catch` blocks, middleware, or error handling patterns.

- **Code Formatting**: Use **Prettier** to format code consistently across the team.

- **Security Best Practices**:

  - For **Node.js**: Use libraries like `helmet` to protect against security vulnerabilities (e.g., HTTP headers).
  - For **React**: Sanitize user inputs to prevent XSS attacks and avoid inline JavaScript in HTML.

- **Avoid Hardcoding**: Use environment variables with `
