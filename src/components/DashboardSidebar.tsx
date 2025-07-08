"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();

  const navLink = [
    { id: 1, link: "Dashboard", href: "/admin" },
    {
      id: 2,
      link: " Create Event Category",
      href: "/admin/create-event-category",
    },
    { id: 3, link: "Create Event", href: "/admin/create-event" },
    { id: 4, link: "Attendee Summary", href: "/admin/attendee-summary" },
    { id: 5, link: "Send Feedback", href: "/admin/send-feedback" },
  ];
  return (
    <aside className=" hidden md:block fixed top-0 left-0 h-screen w-64 bg-purple-100 shadow-md z-40">
      <div className=" p-6 text-xl font-bold border-b border-black">
        My Dashboard
      </div>
      <nav className=" p-4 space-y-4">
        {navLink.map((nav) => (
          <Link
            key={nav.id}
            href={nav.href}
            className={`block ${
              pathname === nav.href
                ? "text-purple-600 font-medium"
                : "text-gray-700"
            } hover:text-purple-600`}
          >
            {nav.link}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
