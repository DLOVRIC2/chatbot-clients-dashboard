import { redirect } from "next/navigation";
import { MetricCard } from "./_components/analytics-cards";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getAnalytics() {
  // Make API request
  const headersList = await headers();
  const cookie = headersList.get("cookie");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie ?? "",
    },
  });
  const data = await res.json();
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
}
export default async function Page() {
  const analytics = await getAnalytics();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }
  const user = session.user;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-6xl mx-auto justify-center items-center">
      <div className="rounded-lg p-6 mb-8 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {user?.image || user?.logoUrl ? (
              <div className="relative">
                <Image
                  src={user.image || user.logoUrl}
                  alt="User avatar"
                  className="  ring-gray-100 dark:ring-gray-700"
                  width={64}
                  height={64}
                  priority
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-400 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
            ) : (
              <div className="h-16 w-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                  {user?.name?.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Welcome back, {user?.name?.split(" ")[0]}!
                </h1>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Here&apos;s what&apos;s happening with your chatbot
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex flex-col items-center space-x-4">
              <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-md text-sm">
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.langsmithProjectName}
                </p>
              </div>
              <div className="px-2.5 py-0.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md">
                {user?.companyName}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          <MetricCard
            title="Total Runs"
            value={analytics.totalRuns}
            type="runs"
          />
          <MetricCard
            title="Total Tokens"
            value={analytics.totalTokens}
            type="tokens"
          />
          <MetricCard
            title="Success Rate"
            value={analytics.successRate}
            type="success"
          />
        </div>
      </div>
    </div>
  );
}
