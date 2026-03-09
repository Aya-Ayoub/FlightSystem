import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful");
        navigate("/"); // redirect to Flights page
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Error logging in");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={login}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;