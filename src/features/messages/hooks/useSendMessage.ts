import { useRef, useState } from "react";
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { sendMessage } from "../api/messaging";
import { cacheMessage } from "../helpers/messageCache";
import { updateInboxForMessage } from "../helpers/inboxCache";
import { createPendingMessage, matchesPendingMessage, seedConfirmedHistory, type PendingMessage } from "../helpers/pendingMessage";
import { messageKeys } from "../queries/messageKeys";
import type { Message, MessagesResponse, Participant, SendMessageInput } from "../types/messaging";

export const useSendMessage = (userId: string, receiver?: Participant, chatId: string | null = null) => {
  const client = useQueryClient();
  const [pending, setPending] = useState<PendingMessage | null>(null);
  const [failed, setFailed] = useState<PendingMessage[]>([]);
  const busy = useRef(false);
  const mutation = useMutation({
    mutationFn: ({ receiver: target, input }: { senderId: string; receiver: Participant; input: SendMessageInput }) => sendMessage(target._id, input),
    onSuccess: async (message, variables) => {
      await client.cancelQueries({ queryKey: messageKeys.history(variables.senderId, variables.receiver._id) });
      seedConfirmedHistory(client, variables.senderId, variables.receiver, message);
      cacheMessage(client, variables.senderId, message);
      updateInboxForMessage(client, variables.senderId, message, true);
      // Refresh the inbox only; history already has the confirmed message.
      void client.invalidateQueries({ queryKey: messageKeys.inboxes(variables.senderId) });
    },
    retry: false,
  });
  const submit = async (input: SendMessageInput) => {
    if (!userId || !receiver?._id || busy.current) return false;
    busy.current = true;
    const key = messageKeys.history(userId, receiver._id);
    const previous = client.getQueryData<InfiniteData<MessagesResponse>>(key);
    const draft = createPendingMessage(userId, receiver._id, chatId, input,
      new Set(previous?.pages.flatMap((page) => page.messages.map((message) => message._id)) ?? []));
    setFailed((current) => current.filter((item) => item.message.senderId !== userId ||
      item.message.receiverId !== receiver._id || item.message.content !== draft.message.content ||
      item.message.attachments.length !== draft.message.attachments.length));
    setPending(draft);
    try {
      await mutation.mutateAsync({ senderId: userId, receiver, input });
      return true;
    } catch (error) {
      setFailed((current) => [...current, draft]);
      throw error;
    } finally { setPending(null); busy.current = false; }
  };
  const pendingFor = (messages: Message[], receiverId: string) => pending &&
    pending.message.senderId === userId && pending.message.receiverId === receiverId &&
    !messages.some((message) => matchesPendingMessage(pending, message)) ? pending.message : null;
  const failedFor = (messages: Message[], receiverId: string) => failed.filter((item) =>
    item.message.senderId === userId && item.message.receiverId === receiverId &&
    !messages.some((message) => matchesPendingMessage(item, message))).map((item) => item.message);
  return { submit, sending: mutation.isPending, pendingFor, failedFor };
};
