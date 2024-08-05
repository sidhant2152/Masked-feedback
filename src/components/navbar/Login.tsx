"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push("/sign-in");
      }}>
      Sign In
    </Button>
  );
};

export default Login;
