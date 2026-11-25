export default function NavCountBadge({ count, tone = "green" }: { count: number; tone?: "green" | "pink" }) {
  if (!Number.isFinite(count) || count <= 0) return null;
  return (
    <span aria-hidden="true" className={`absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-semibold leading-none text-white ${tone === "pink" ? "bg-[#FF5D7A]" : "bg-[#25C269]"}`}>
      {count > 99 ? "99+" : count}
    </span>
  );
}
