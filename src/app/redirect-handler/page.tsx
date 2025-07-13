import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function RedirectHandler() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const role = session.user?.role;

  if (role === "admin") {
    redirect("/admin/create-event-category");
  } else {
    redirect("/");
  }
}
