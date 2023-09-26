import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setUsername(value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello", username);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={username}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default App;
