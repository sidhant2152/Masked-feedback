import { Skeleton } from "../ui/skeleton";

const MessagesSkeleton = () => {
  return (
    <div className="flex-grow flex flex-col gap-4 w-full">
      <Skeleton className="h-[2.3rem] " />
      <Skeleton className="h-[2.3rem] " />
      <Skeleton className="h-[2.3rem] " />
    </div>
  );
};

export default MessagesSkeleton;
