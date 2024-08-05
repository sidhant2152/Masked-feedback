"use client";
import { useDebounceCallback } from "usehooks-ts";
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
import { signupSchema, signupType } from "@/schema/signUpSchema";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const SignUpForm = () => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [usernameIsLoading, setUsernameIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<null | boolean>(null);
  const [username, setUsername] = useState("");
  const setDebouncedUsername = useDebounceCallback(setUsername, 400);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<signupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: { password: "", username: "", email: "" },
  });

  setDebouncedUsername(form.watch("username"));

  useEffect(() => {
    const checkUsername = async () => {
      form.clearErrors("username");
      if (username.length === 0) {
        setUsernameError(null);
        setUsernameIsLoading(false);
        return;
      }
      try {
        setUsernameError(null);
        setUsernameIsLoading(true);
        const response: AxiosResponse<ApiResponse> = await axios.get(
          `/api/check-username-unique?username=${username}`
        );
        // console.log("🚀 ~ checkUsername ~ response:", response);
        setUsernameError(!response.data.success);
      } catch (error: any) {
        // console.log("🚀 ~ checkUsername ~ error:", error);
        setUsernameError(true);
        form.setError("username", {
          message: error?.response?.data?.message || "Try another username",
        });
      } finally {
        setUsernameIsLoading(false);
      }
    };
    checkUsername();
  }, [username, form]);

  const onSubmit = async (data: signupType) => {
    try {
      setFormIsLoading(true);
      console.log(data);
      const response = await axios.post("/api/sign-up", data);
      // console.log("🚀 ~ onSubmit ~ response:", response);
      toast({
        title: "Sign Up Success",
        description: response.data.message || "Account created successfully",
      });
      router.push(`/verify/${username}`);
    } catch (error: any) {
      // console.log("🚀 ~ onSubmit ~ error:", error);
      form.reset();
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Uh oh! Something went wrong.",
        description: "Please try again",
      });
    } finally {
      setFormIsLoading(false);
    }
  };
  return (
    <div className="mx-auto w-full max-w-md ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="john@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-gray-400 text-sm">
                      We will send you a verification code
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Username
                      {usernameIsLoading && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      {usernameError === false && (
                        <CircleCheck className="h-4 w-4 text-green-500" />
                      )}
                      {usernameError === true && (
                        <CircleX className="h-4 w-4 text-red-500" />
                      )}
                    </FormLabel>
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

              <Button
                className="w-full"
                disabled={formIsLoading || usernameError === true}
                type="submit">
                {formIsLoading ? (
                  <div className="flex gap-2 items-center">
                    <Loader2 className="h-4 w-4 animate-spin" />{" "}
                    <span>Loading</span>
                  </div>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link href="/sign-in" className="underline px-2">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
