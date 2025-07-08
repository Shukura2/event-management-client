import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import React from "react";
import { getServerSession } from "next-auth/next";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    redirect("/api/auth/signin?callbackUrl=");
  }
  if (session?.user?.role !== "admin") {
    redirect("/access-denied");
  }

  return (
    <div className="flex min-h-screen bg-purple-200">
      <DashboardSidebar />
      <div className="ml-64 w-full flex flex-col">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
