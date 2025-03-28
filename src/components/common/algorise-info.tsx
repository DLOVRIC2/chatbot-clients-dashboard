import { cn } from "@/lib/utils";

import Image from "next/image";

export async function AlgoriseInfo() {
  return (
    <div
      className={cn(
        "cursor-pointer border rounded-lg flex items-center justify-start gap-2 p-2"
      )}
    >
      <div className="z-50 flex h-8 items-center justify-center rounded-full">
        <Image
          src="/RotationLoad.gif"
          unoptimized
          alt={"algorise"}
          width={96}
          height={96}
          className="w-24 h-24 object-contain"
        />
      </div>

      <div className="text-sm font-bold h-7 -ml-6">Algorise</div>
    </div>
  );
}
