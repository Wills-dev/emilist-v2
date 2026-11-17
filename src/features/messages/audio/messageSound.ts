import type { Message } from "../types/messaging";
import { messageNotificationsEnabled } from "@/store/notificationPreferencesStore";
import { subscribeMessageAudio, resumeMessageAudio } from "./messageAudioContext";
import { playMessageChime } from "./playMessageChime";

const played = new Set<string>();
export const subscribeMessageSound = subscribeMessageAudio;
export const playMessageSound = async (userId: string, message: Message) => {
  if (message.senderId === userId || message.receiverId !== userId || navigator.onLine === false || !messageNotificationsEnabled(userId)) return;
  const key = `${userId}:${message._id}`;
  if (played.has(key)) return;
  const receivedAt = Date.now();
  const context = await resumeMessageAudio();
  if (!context || Date.now() - receivedAt > 1500 || played.has(key) || !messageNotificationsEnabled(userId)) return;
  try {
    playMessageChime(context);
    played.add(key);
    if (played.size > 1000) played.delete(played.values().next().value!);
  } catch { /* Sound must never interrupt message delivery. */ }
};
