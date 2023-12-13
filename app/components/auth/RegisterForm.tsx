"use client";
import { FormEvent, useState } from "react";
import classes from "./RegisterForm.module.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error in registration: ", errorData)
        dispatch(setMessage("Email already in use."));
        dispatch(toggleModal());
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        console.log("Registration success: ", response);
        dispatch(setMessage("Registration Succesful"));
        dispatch(toggleModal());
        setIsLoading(false);
        router.push("/");
      }
    } catch (error: any) {
      console.log("Error in registration: ", error);

      dispatch(setMessage("Unknown Network or Server Error"));
      dispatch(toggleModal());
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.registerContainer}>
      <form onSubmit={handleSubmit}>
        <h3>Register Page</h3>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="email" />

        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="password" />

        <div className={classes.buttonContainer}>
          {!isLoading && <button type="submit">Register</button>}
          {isLoading && <CircularProgress />}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
