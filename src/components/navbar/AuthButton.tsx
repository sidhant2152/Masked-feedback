"use client";
import { usePathname } from "next/navigation";
function AuthButton({ children }: { children?: React.ReactNode }) {
  const pathName = usePathname();

  if (pathName === "/sign-in" || pathName === "/sign-up") {
    return;
  }

  return <>{children}</>;
}

export default AuthButton;
