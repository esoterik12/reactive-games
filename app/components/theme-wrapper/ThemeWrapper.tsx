"use client";
import { useAppSelector } from "@/app/redux/hooks";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  console.log("Theme in theme wrapped: ", theme);

  return <main className={`app-container ${theme}`}>{children}</main>;
};

export default ThemeWrapper;
