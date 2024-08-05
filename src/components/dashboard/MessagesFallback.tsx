import { Skeleton } from "../ui/skeleton";

const MessagesFallback = () => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="w-full h-[100px] rounded-md" />
      <Skeleton className="w-full h-[100px] rounded-md" />
      <Skeleton className="w-full h-[100px] rounded-md" />
      <Skeleton className="w-full h-[100px] rounded-md" />
    </div>
  );
};

export default MessagesFallback;
