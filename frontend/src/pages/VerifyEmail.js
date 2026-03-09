import { useState } from "react";

function VerifyEmailPage() {
  const [form, setForm] = useState({ email: "", code: "" });
  const [message, setMessage] = useState("");

  const verify = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error verifying email");
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Verification Code" onChange={e => setForm({ ...form, code: e.target.value })} />
      <button onClick={verify}>Verify</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default VerifyEmailPage;