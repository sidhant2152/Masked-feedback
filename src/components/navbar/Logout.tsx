"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
const Logout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function signOutHandler() {
    try {
      setLoading(true);
      const response = await axios.get("/api/sign-out");
      toast({
        title: "Logged out successfully",
        description: response.data.message || "You were logged out!",
        variant: "default",
      });
      router.push("/");
      router.refresh();
    } catch (error: any) {
      // console.log("🚀 ~ signOutHandler ~ error:", error);
      toast({
        title: "Logged out failed",
        description: error?.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button disabled={loading} onClick={signOutHandler}>
      Logout
    </Button>
  );
};

export default Logout;
