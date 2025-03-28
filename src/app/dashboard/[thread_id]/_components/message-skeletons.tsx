export function UserMessageSkeleton() {
  return (
    <div className="flex justify-end mb-6">
      <div
        className="max-w-[80%] rounded-lg p-4 animate-pulse
            bg-gray-100 dark:bg-[#1e1e1e] 
            border border-gray-200 dark:border-[#333333]"
      >
        <div className="h-4 w-32 bg-gray-200 dark:bg-[#333333] rounded mb-2" />
        <div className="space-y-2">
          <div className="h-4 w-64 bg-gray-200 dark:bg-[#333333] rounded" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-[#333333] rounded" />
        </div>
      </div>
    </div>
  );
}

export function AIMessageSkeleton() {
  return (
    <div className="flex mb-6">
      <div className="flex-1">
        <div
          className="max-w-[80%] rounded-lg p-4 animate-pulse
              bg-gray-100 dark:bg-[#1e1e1e]
              border border-gray-200 dark:border-[#333333]"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#333333]" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-[#333333] rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-[#333333] rounded" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-[#333333] rounded" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-[#333333] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
