"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
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
import {
  validationSchema,
  validationSchemaType,
} from "@/schema/validationSchema";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type VerifyFormProps = {
  params: { username: string };
};

const VerifyForm = ({ params }: VerifyFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<validationSchemaType>({
    resolver: zodResolver(validationSchema),
    defaultValues: { code: "", username: params.username },
  });

  const onSubmit = async (data: validationSchemaType) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await axios.post("/api/verify-code", data);
      toast({
        title: "User verified successfully",
        description: response?.data?.message,
        variant: "default",
      });
      router.push("/sign-in");
    } catch (error: any) {
      // console.log("🚀 ~ onSubmit ~ error:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error?.response?.data?.message || "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto w-full max-w-md ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verify Your Account</CardTitle>
          <CardDescription>
            Enter the verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        pattern={REGEXP_ONLY_DIGITS}
                        maxLength={6}
                        {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
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
                  "Verify"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyForm;
