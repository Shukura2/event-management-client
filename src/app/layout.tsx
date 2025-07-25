import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          {children}
          <ToastContainer
            autoClose={4000}
            hideProgressBar={true}
            theme="light"
          />
        </body>
      </AuthProvider>
    </html>
  );
}
