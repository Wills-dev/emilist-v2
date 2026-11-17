export const formatApplicantDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unavailable" : new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric" }).format(date);
};
