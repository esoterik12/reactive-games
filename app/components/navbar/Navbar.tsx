"use client";
import classes from "./NavBar.module.css";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { toggleTheme } from "@/app/redux/themeslice";
import { useDispatch } from "react-redux";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  const theme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();

  function logoutHandler() {
    signOut({ callbackUrl: '/' });
  }

  function themeHandler() {
    dispatch(toggleTheme());
  }

  let styles;
  theme === "light"
    ? (styles = classes.lightNavbar)
    : (styles = classes.darkNavbar);

  return (
    <>
      <div className={styles}>
        <Link className={classes.homeLink} href="/">
          Puzzles by React
        </Link>

        <div className={classes.buttonContainer}>
          <button className={classes.navButton} onClick={themeHandler}>
            {theme === "dark" ? <ModeNightIcon /> : <LightModeIcon />}
          </button>
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
    </>
  );
}
