import SendMessageForm from "@/components/publicPage/SendMessageForm";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
const userPublicPage = ({ params }: { params: { username: string } }) => {
  return (
    <div className="container mx-auto my-8 p-6 rounded max-w-4xl">
      <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
        Public Profile Link
      </h1>
      <SendMessageForm params={params} />
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
};

export default userPublicPage;
