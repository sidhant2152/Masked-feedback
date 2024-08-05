"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginSchema, loginSchemaType } from "@/schema/loginSchema";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "", username: "" },
  });
  const onSubmit = async (data: loginSchemaType) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await axios.post("/api/sign-in", data);
      // console.log("🚀 ~ onSubmit ~ response:", response);

      toast({
        title: "Logged in successfully",
        description: "You were logged in!",
      });
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      // console.log("🚀 ~ onSubmit ~ error:", error);
      toast({
        title: "Logged in failed",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      form.reset();
    } finally {
      setLoading(false);
    }
  };

  function handleDemoLogin() {
    form.setValue("username", "Demo_Account");
    form.setValue("password", "thisIsDemoPassword");
  }
  return (
    <div className="mx-auto w-full max-w-md ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} className="w-full" type="submit">
                {loading ? (
                  <div className="flex gap-2 items-center">
                    <Loader2 className="h-4 w-4 animate-spin" />{" "}
                    <span>Loading</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full">
                Add Demo Credentials
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link href="/sign-up" className="underline px-2">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
