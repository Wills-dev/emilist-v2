import type { SendMessageInput } from "../types/messaging";
export const MAX_MESSAGE_FILES = 10;
export const MAX_FILE_SIZE = 15 * 1024 * 1024;
export const validateMessage = ({ content, files }: SendMessageInput) => {
  if (!content.trim() && !files.length) return "Write a message or attach a file.";
  if (content.trim().length > 5000) return "Messages can contain up to 5,000 characters.";
  if (files.length > MAX_MESSAGE_FILES) return "Attach up to 10 files per message.";
  if (files.some((file) => file.size > MAX_FILE_SIZE)) return "Each attachment must be 15 MB or smaller.";
  return null;
};
