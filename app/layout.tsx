import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar/Navbar";
import { Providers } from "./redux/provider";
import { getServerSession } from "next-auth";
import ThemeWrapper from "./components/theme-wrapper/ThemeWrapper";
import Modal from "./components/modal/modal";

export const metadata: Metadata = {
  title: "React Puzzles",
  description: "Create basic puzzles using React!",
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
          <ThemeWrapper>
            <NavBar session={session} />
            {children}
            <div id="modal-root"></div>
            <Modal />
          </ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
}
