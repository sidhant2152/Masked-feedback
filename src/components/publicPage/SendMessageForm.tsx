"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useCompletion } from "ai/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { messageSchema, messageSchemaType } from "@/schema/messageSchema";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { revalidateCustomPath } from "@/lib/revalidatePath";
import {
  generateRandomMessages,
  initialMessageString,
  parseStringMessages,
} from "@/helpers/suggestMessages";
import MessagesSkeleton from "./MessagesSkeleton";

const SendMessageForm = ({ params }: { params: { username: string } }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<messageSchemaType>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "", username: params.username },
  });

  // send message
  const onSubmit = async (data: messageSchemaType) => {
    // console.log("🚀 ~ onSubmit ~ data:", data);
    try {
      setLoading(true);
      const response = await axios.post("/api/message", data);
      await revalidateCustomPath("/dashboard");
      form.reset();
      toast({
        title: "Message sent successfully",
        description: response.data.message || "Message sent successfully",
      });
    } catch (error: any) {
      // console.log("🚀 ~ onSubmit ~ error:", error);
      form.reset();
      toast({
        variant: "destructive",
        title: "Message sending failed",
        description: error?.response?.data?.message || "Try again later",
      });
    } finally {
      setLoading(false);
    }
  };
  // suggest message
  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    setCompletion,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  });
  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };
  //suggest messages handler
  const fetchSuggestedMessages = async () => {
    try {
      complete("");
    } catch (error) {
      // WORKAROUND : If credits expires
    }
  };
  useEffect(() => {
    if (error) {
      // console.log("🚀 ~ fetchSuggestedMessages ~ error:", error);
      toast({
        title: "Credits expired :(",
        description: "Giving pregenerated response !",
        variant: "destructive",
      });
      setCompletion(generateRandomMessages());
    }
  }, [error, setCompletion]);

  return (
    <div className="my-10 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Send Anonymous Message to @{params.username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            <Button disabled={loading} type="submit">
              {loading ? (
                <div className="flex gap items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending
                </div>
              ) : (
                <span>Send Message</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            onClick={fetchSuggestedMessages}
            className="my-4"
            disabled={isSuggestLoading}>
            Suggest Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <ScrollArea className="w-full">
            <CardContent className="flex flex-col space-y-4">
              {!isSuggestLoading ? (
                parseStringMessages(completion).map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="mb-2 w-full text-nowrap"
                    onClick={() => handleMessageClick(message)}>
                    {message}
                  </Button>
                ))
              ) : (
                <MessagesSkeleton />
              )}
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default SendMessageForm;
