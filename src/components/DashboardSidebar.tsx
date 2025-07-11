"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLink = [
    {
      id: 2,
      link: " Create Event Category",
      href: "/admin/create-event-category",
    },
    { id: 3, link: "Create Event", href: "/admin/create-event" },
    { id: 4, link: "Attendee Summary", href: "/admin/attendee-summary" },
    { id: 5, link: "Send Feedback", href: "/admin/send-feedback" },
    { id: 6, link: "Go back to home", href: "/" },
  ];
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 bg-purple-500 text-white rounded"
      >
        ☰
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-purple-100 shadow-md z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="p-6 text-xl font-bold border-b ml-6 md:ml-0 border-black">
          My Dashboard
        </div>
        <nav className="p-4 space-y-4">
          {navLink.map((nav) => (
            <Link
              key={nav.id}
              href={nav.href}
              className={`block ${
                pathname === nav.href
                  ? "text-purple-600 font-medium"
                  : "text-gray-700"
              } hover:text-purple-600`}
              onClick={() => setIsOpen(false)}
            >
              {nav.link}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;
