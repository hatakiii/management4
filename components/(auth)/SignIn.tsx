"use client";

import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError(null);
    setLoading(true);

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      setLoading(false);
      return;
    }

    // JWT хадгалах (энгийн хувилбар)
    localStorage.setItem("token", data.token);

    setLoading(false);
    alert("Logged in successfully");

    // role-оор redirect хийж болно
    // data.user.role === "ADMIN" ? router.push("/admin") : router.push("/dashboard")
  }

  return (
    <div className="space-y-4 max-w-sm">
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </div>
  );
}
