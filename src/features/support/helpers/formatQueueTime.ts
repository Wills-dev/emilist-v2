const duration = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "";
  let remaining = Math.floor(seconds);
  if (remaining < 60) return remaining === 1 ? "1 second" : `${remaining} seconds`;
  const parts: string[] = [];
  for (const [unit, size] of [["day", 86400], ["hour", 3600], ["minute", 60]] as const) {
    const count = Math.floor(remaining / size);
    remaining %= size;
    if (count) parts.push(`${count} ${unit}${count === 1 ? "" : "s"}`);
  }
  return parts.slice(0, 2).join(" ");
};

export const formatQueueTime = (ticket: Record<string, unknown>) => {
  const raw = ticket.queueTime;
  const queue = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  if (typeof queue.formatted === "string" && queue.formatted.trim()) return { label: "Queue time", value: queue.formatted };
  const explicitSeconds = ticket.queueTimeSeconds ?? queue.totalSeconds;
  if (typeof explicitSeconds === "number") return { label: "Queue time", value: duration(explicitSeconds) };
  if ([queue.hours, queue.minutes, queue.seconds].some((value) => typeof value === "number")) {
    return { label: "Queue time", value: duration(Number(queue.hours || 0) * 3600 + Number(queue.minutes || 0) * 60 + Number(queue.seconds || 0)) };
  }
  if (typeof raw === "string") {
    const clock = raw.trim().match(/^(\d+):([0-5]\d):([0-5]\d)$/);
    if (clock) return { label: "Queue time", value: duration(Number(clock[1]) * 3600 + Number(clock[2]) * 60 + Number(clock[3])) };
    if (/\d\s*(days?|hours?|minutes?|seconds?|ms|h|m|s)\b/i.test(raw)) return { label: "Queue time", value: raw };
  }
  const unit = String(ticket.queueTimeUnit ?? queue.unit ?? "").toLowerCase();
  const multiplier = ({ seconds: 1, second: 1, minutes: 60, minute: 60, hours: 3600, hour: 3600, milliseconds: 0.001 } as Record<string, number>)[unit];
  const numeric = typeof raw === "number" || typeof raw === "string" && raw.trim() ? Number(raw) : NaN;
  if (Number.isFinite(numeric) && multiplier) return { label: "Queue time", value: duration(numeric * multiplier) };
  // A bare number has no documented unit. Use timestamps and label it accurately.
  const start = typeof ticket.createdAt === "string" ? new Date(ticket.createdAt).getTime() : NaN;
  const resolved = ticket.status === "resolved";
  const end = resolved ? typeof ticket.resolvedAt === "string" ? new Date(ticket.resolvedAt).getTime() : NaN : Date.now();
  return { label: resolved ? "Time to resolution" : "Time open", value: duration((end - start) / 1000) };
};
