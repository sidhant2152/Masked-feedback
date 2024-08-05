"use client";

import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { revalidateCustomPath } from "@/lib/revalidatePath";
import { toast } from "../ui/use-toast";

const RevalidateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handler = async () => {
    try {
      setIsLoading(true);
      await revalidateCustomPath("/dashboard");
      toast({
        title: "Refreshed Messages",
        description: "Showing latest messages",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button className="mt-4" onClick={handler} variant="outline">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default RevalidateButton;
