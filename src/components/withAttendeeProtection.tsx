"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAttendeeProtection = <P extends object>(Component: React.ComponentType<P>):React.FC<P> => {
  return function ProtectedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;

      if (status === "unauthenticated") {
        router.push("/api/auth/signin?callbackUrl=/");
        return;
      }

      if (session?.user?.role !== "attendee") {
        router.push("/access-denied");
      }
    }, [session, status, router]);

    if (
      status === "loading" ||
      status === "unauthenticated" ||
      !session?.user ||
      session?.user?.role !== "attendee"
    ) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAttendeeProtection;
