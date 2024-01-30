"use client";
import classes from "./Navbar.module.css";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  function logoutHandler() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <div className={classes.lightNavbar}>
      <Link className={classes.homeLink} href="/">
        <h4>Reactive Classroom</h4>
      </Link>

      <div className={classes.buttonContainer}>
        {!session && (
          <Link className={classes.navButton} href="/login">
            <button>
              <LoginIcon />
            </button>
          </Link>
        )}
        {session && (
          <>
            <Link href="/profile">
              <button className={classes.navButton}>
                <PersonIcon />
              </button>
            </Link>

            <button className={classes.navButton} onClick={logoutHandler}>
              <LogoutIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
