"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  acceptMessageSchema,
  AcceptMessageSchemaType,
} from "@/schema/acceptMessageSchema";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { toast } from "../ui/use-toast";
type AcceptMessagesToggleProps = {
  status: boolean;
};
const AcceptMessagesToggle = ({ status }: AcceptMessagesToggleProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, setValue, watch } = useForm<AcceptMessageSchemaType>({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: { acceptMessage: false },
  });
  const acceptMessage = watch("acceptMessage");
  async function handleChangeStatus() {
    try {
      setIsLoading(true);
      setValue("acceptMessage", !acceptMessage);
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessage: !acceptMessage,
      });
      setValue("acceptMessage", !acceptMessage);
      // console.log("🚀 ~ handleChangeStatus ~ response:", response);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setValue("acceptMessage", !acceptMessage);
      toast({
        title: "Error",
        description:
          axiosError.response?.data?.message ??
          "Failed to update user message acceptance status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function getUserAcceptingStatus() {
      try {
        setIsLoading(true);
        const response = await axios.get<ApiResponse>("/api/accept-messages");
        setValue("acceptMessage", response.data?.acceptMessage || false);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data?.message ??
            "Failed to get user message acceptance status",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    getUserAcceptingStatus();
  }, [setValue]);

  return (
    <div className="mt-8 flex gap-4">
      <Switch
        {...register("acceptMessage")}
        checked={acceptMessage}
        disabled={isLoading}
        onCheckedChange={handleChangeStatus}
      />
      <p className="leading-7 text-lg">
        Accept Messages: {acceptMessage ? "On" : "Off"}
      </p>
    </div>
  );
};

export default AcceptMessagesToggle;
