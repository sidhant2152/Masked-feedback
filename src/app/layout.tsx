import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import dayjs from "dayjs";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Masked Feedback",
  description: "Dive into the World of Anonymous Feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn("min-h-screen relative", inter.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}

          {/* Footer */}
          <footer className="text-center  space-y-1 text-sm border-t border-muted p-4 md:p-6">
            <p>
              © {dayjs(new Date()).get("year")} Masked Feedback. All rights
              reserved.
            </p>
            <p className="text-gray-400">
              - Developed by
              <Link
                className="px-1 text-blue-600"
                href="https://github.com/Sidhant2152"
              >
                Sidhant Kapoor
              </Link>
            </p>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
