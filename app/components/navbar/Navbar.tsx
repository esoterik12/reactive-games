"use client"
import classes from "./NavBar.module.css";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import Logout from "../auth/Logout";
import { useSelector } from "react-redux";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {  const theme = useSelector((state: any) => state.theme.theme);

  console.log("Theme: ", theme);

  return (
    <>
      <div className={classes.lightNavbar}>
        <Link className={classes.homeLink} href="/">
          Puzzles by React
        </Link>

        <div className={classes.buttonContainer}>
          <button className={classes.navButton}>
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
              <button className={classes.navButton}>
                <PersonIcon />
              </button>
              <button className={classes.navButton}>
                <Logout />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
