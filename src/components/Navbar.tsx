"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "About Us", href: "#" },
    { id: 3, title: "Events", href: "#" },
    { id: 4, title: "News", href: "#" },
    { id: 5, title: "Contact", href: "#" },
  ];

  return (
    <div className=" sm:max-w-[650px] md:max-w-[730px] lg:max-w-[1200px] mx-auto px-4 md:px-0">
      <div className=" p-4 lg:px-7 flex justify-between items-center relative">
        <Image
          src="https://preview.colorlib.com/theme/agenda/images/logo.png"
          alt="logo"
          width={82}
          height={64}
        />

        <div className=" hidden lg:flex space-x-6 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`link-style ${
                pathname === link.href && " text-[#AB00E5]"
              } `}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:items-center space-x-6 text-white">
          {status === "loading" ? (
            <></>
          ) : (
            <>
              {session ? (
                <button onClick={() => signOut()}>Logout</button>
              ) : (
                <button onClick={() => signIn("google")}>
                  Login with Google
                </button>
              )}
            </>
          )}
        </div>

        <button className=" lg:hidden text-white" onClick={handleMenuToggle}>
          {isMenuOpen ? (
            <IoMdClose className="text-3xl" />
          ) : (
            <IoMdMenu className="text-3xl" />
          )}
        </button>

        {isMenuOpen && (
          <div className=" lg:hidden flex flex-col space-y-4 absolute top-[95px] right-0 w-[50%] bg-slate-400 h-screen p-4">
            <Link href="/" className="link-style">
              Home
            </Link>
            <Link href="#" className="link-style">
              About Us
            </Link>
            <Link href="#" className="link-style">
              Events
            </Link>
            <Link href="#" className="link-style">
              News
            </Link>
            <Link href="#" className="link-style">
              Contact
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
