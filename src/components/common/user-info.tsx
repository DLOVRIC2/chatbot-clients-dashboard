import { cn } from "@/lib/utils";

import { Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

export async function UInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div
      className={cn(
        "cursor-pointer border rounded-lg flex items-center justify-start gap-2 p-2"
      )}
    >
      <div className="z-50 flex h-8 items-center justify-center rounded-full">
        {user?.logoUrl ? (
          <Image
            src={user.logoUrl}
            alt={user.name || "User"}
            width={32}
            height={32}
            className="w-16 h-8 object-contain"
          />
        ) : (
          <Zap className="h-6 w-6 text-[#d0ff00]" />
        )}
      </div>

      <div className="text-sm font-bold h-7">
        {user?.name} | {user?.companyName}
      </div>
    </div>
  );
}

export function UserMenuSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      {
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      }
    </div>
  );
}

export default function UserInfo() {
  return (
    <Suspense fallback={<UserMenuSkeleton />}>
      <UInfo />
    </Suspense>
  );
}
