import { useState } from "react";
import { formStyles } from "./Login";
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "../supabaseConfig/supabase";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<AuthError | null>(null)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        const { user, session, error } = await supabase.auth.signUp({
            email: username,
            password: password,
            options: {
                data: {
                  display_name: name
                }
              }
          })

          if (error) {
            setError(error)
          } else {
            setError(null)
            console.log('user successfully signed up')
            navigate("/dashboard");
          }
    }
    return ( 
    <div style={formStyles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        {error && <p style={formStyles.error}>{error.message}</p>}

        <div style={formStyles.inputGroup}>

        <label htmlFor="displayName">Name:</label>
          <input
            type="name"
            id="displayName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={formStyles.input}
          />
            
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

        <button type="submit" style={formStyles.button}>Sign up</button>
      </form>
    </div>

     );
}
 
export default SignUp;