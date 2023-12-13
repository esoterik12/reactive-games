"use client";
import classes from "./LoginForm.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (!response?.error) {
        setIsLoading(false);
        router.push("/");
        router.refresh();
      }

      if (response?.error) {
        console.log("Error loggin in: ", response?.error);
        dispatch(setMessage("Incorrect username or password."));
        dispatch(toggleModal());
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error loggin in: ", error);
      dispatch(setMessage("Unknown server error."));
      dispatch(toggleModal());
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.loginContainer}>
      <form onSubmit={handleSubmit}>
        <h3>Login Page</h3>

        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="email" />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="password" />
        <div className={classes.buttonContainer}>
          {!isLoading && <><button type="submit">Login</button>
          <Link href="/register">
            <button className={classes.signupButton}>Sign Up</button>
          </Link></>}
          {isLoading && <CircularProgress />}
        </div>
      </form>
    </div>
  );
}
