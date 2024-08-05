import { IMessage } from "@/models/Message";

export type ApiResponse = {
  success: boolean;
  message: string;
  acceptMessage?: boolean;
  messages?: IMessage[];
  error?: any;
};
