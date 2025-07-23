"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { grantAdminAccess } from "@/app/action";
import { toast } from "react-toastify";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isAuth, setIsAuth] = useState(false);
  const [processing, setProcessing] = useState(false);

  const navLinks = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "About Us", href: "#" },
    { id: 3, title: "Events", href: "#" },
    { id: 4, title: "News", href: "#" },
    { id: 5, title: "Contact", href: "#" },
  ];

  const adminAccess = async () => {
    setProcessing(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = await grantAdminAccess(session.accessToken);
    if (result.success) {
      toast(result.message);
    } else {
      toast.error(result.message);
    }
    setProcessing(false);
  };

  return (
    <div className="text-white relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center h-[80px] p-5 md:py-7 md:px-9">
          <Image
            src="https://preview.colorlib.com/theme/agenda/images/logo.png"
            alt="logo"
            width={82}
            height={64}
          />
          <div className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <Link key={link.id} href={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
          <div>
            {status === "loading" ? (
              <></>
            ) : (
              <>
                {session ? (
                  <div className=" flex gap-x-5">
                    <button onClick={() => signOut()}>Logout</button>
                    {session.user?.role !== "admin" && (
                      <button onClick={adminAccess} disabled={processing}>
                        {processing ? "Processing..." : "Get Admin Access"}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      signIn("google", {
                        callbackUrl: "/redirect-handler",
                      });
                      setIsAuth(true);
                    }}
                    disabled={isAuth}
                    className="text-sm md:text-base"
                  >
                    {isAuth ? "Processing..." : "Login with Google"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
