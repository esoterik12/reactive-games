"use client";
import classes from "./LoginForm.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log({ response });

    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className={classes.loginContainer}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="email" />

        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
