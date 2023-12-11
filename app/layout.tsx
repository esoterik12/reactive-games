import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar/Navbar";
import { Providers } from "./redux/provider";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "React Puzzles",
  description: "Create basic classroom puzzles using React!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="app-container light">
        <Providers>
          <NavBar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
