import { redirect } from "next/navigation";

// since no landing page is needed redirect this to dashboard
export default function Home() {
  redirect("/dashboard");
}
