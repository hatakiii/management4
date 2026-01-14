"use client";

import { useState } from "react";

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setError(null);
    setLoading(true);

    const form = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);

    // password check
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      setLoading(false);
      return;
    }

    form.reset();
    setLoading(false);
    alert("Account created successfully");
  }

  return (
    <form className="space-y-4 max-w-md">
      <input name="username" placeholder="Username" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="firstName" placeholder="First Name" required />
      <input name="lastName" placeholder="Last Name" required />

      <select name="departmentId">
        <option value="">Select Department</option>
        <option value="1">HR</option>
        <option value="2">Engineering</option>
      </select>

      <input
        name="salary"
        type="number"
        step="0.01"
        placeholder="Salary"
        required
      />
      <input name="birthday" type="date" required />
      <input
        name="experience"
        type="number"
        placeholder="Years of experience"
        required
      />

      <input name="password" type="password" placeholder="Password" required />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        required
      />

      {error && <p className="text-red-500">{error}</p>}

      <button type="button" onClick={handleClick} disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
}
