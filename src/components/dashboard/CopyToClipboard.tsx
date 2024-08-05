"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

type CopyToClipboardProps = {
  username: string;
};

const CopyToClipboard = ({ username }: CopyToClipboardProps) => {
  const [publicUrl, setPublicUrl] = useState("");
  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.host}/user/${username}`;
    setPublicUrl(url);
  }, [username]);

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(publicUrl);
    toast({
      title: "URL Copied!",
      description: "Profile URL has been copied to clipboard.",
    });
  }

  return (
    <section className="mt-8">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Copy Your Unique Link
      </h4>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-4">
        <code className="leading-7 min-h-[2.3rem] font-mono bg-muted/80 py-1.5 flex-grow rounded-md px-4 ">
          {publicUrl}
        </code>
        <Button onClick={handleCopyToClipboard}>Copy</Button>
      </div>
    </section>
  );
};

export default CopyToClipboard;
