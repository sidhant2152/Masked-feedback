"use client";

import dayjs from "dayjs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteConfirmationAlert from "./DeleteConfirmationAlert";
import { Message } from "@/types/messages";

type MessageItemProps = {
  message: Message;
};

export function MessageItem({ message }: MessageItemProps) {
  return (
    <Card className="card-bordered">
      <CardHeader>
        <div className="flex gap-1 justify-between items-start">
          <CardTitle>{message.content}</CardTitle>
          <DeleteConfirmationAlert id={message._id} />
        </div>
        <div className="text-sm">
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      </CardHeader>
    </Card>
  );
}
