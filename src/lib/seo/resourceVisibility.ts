export const isPublicResource = (kind: "jobs" | "materials" | "experts", item: Record<string, unknown>) => {
  if (item.isDeleted === true || item.isActive === false || item.visibility === "private") return false;
  const status = typeof item.status === "string" ? item.status.toLowerCase() : "";
  if (["inactive", "draft", "archived", "deleted", "canceled", "cancelled", "private"].includes(status)) return false;
  if (kind === "jobs") return status === "listed";
  if (kind === "materials") return status === "active";
  return true;
};
