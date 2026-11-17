export const attachmentUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : undefined;
  } catch { return undefined; }
};
