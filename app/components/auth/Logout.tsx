'use client'
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react"

export default function Logout() {
  function logoutHandler() {
    signOut()
  }

  return (
    <span onClick={logoutHandler}>
      <LogoutIcon />
    </span>
  )
}