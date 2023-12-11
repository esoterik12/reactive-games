"use client";
import { FormEvent } from "react";
import classes from "./RegisterForm.module.css";

export default function RegisterForm() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    console.log({ response });
  };

  return (
    <div className={classes.registerContainer}>
    <form onSubmit={handleSubmit} >
      <h3>Register Page</h3>
      <label htmlFor="email">Email</label>
      <input name="email" id="email" type="email" />

      <label htmlFor="password">Password</label>
      <input name="password" id="password" type="password" />

      <button type="submit">Register</button>
    </form></div>
  );
}
