import AcceptMessagesToggle from "@/components/dashboard/AcceptMessagesToggle";
import CopyToClipboard from "@/components/dashboard/CopyToClipboard";
import MessageList from "@/components/dashboard/MessageList";
import MessagesFallback from "@/components/dashboard/MessagesFallback";
import RevalidateButton from "@/components/dashboard/RevalidateButton";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/getUser";

import { redirect } from "next/navigation";
import { Suspense } from "react";
const dashboardPage = async () => {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 px-2 sm:px-6 py-8 ">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        User Dashboard
      </h1>
      {/* Copy to clipboard section */}
      <CopyToClipboard username={user.username} />
      {/* Accept messages toggle  */}
      <div className="mb-4">
        <AcceptMessagesToggle status={user.isAcceptingMessages} />
      </div>
      <Separator />
      {/* Messages Section */}
      <RevalidateButton />
      <Suspense fallback={<MessagesFallback />}>
        <MessageList />
      </Suspense>
    </div>
  );
};

export default dashboardPage;
