import { useState } from "react";
import { supabase } from "../supabaseConfig/supabase";
import { AuthError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<null | AuthError>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("User trying to sign in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) {
      setError(error);
      console.error("Login error:", error.message);
    } else {
      console.log("User signed in:", data.user);
      setError(null); // Clear error on successful login
      navigate('/dashboard')
    }
  };

  return (
    <div style={formStyles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        {error && <p style={formStyles.error}>{error.message}</p>}

        <div style={formStyles.inputGroup}>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={formStyles.input}
          />
        </div>

        <div style={formStyles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={formStyles.input}
          />
        </div>

        <button type="submit" style={formStyles.button}>Login</button>
      </form>
    </div>
  );
};

export const formStyles = {
  container: {
    maxWidth: "400px",
    margin: "50px 20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default Login;
