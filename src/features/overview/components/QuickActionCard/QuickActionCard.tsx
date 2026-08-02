import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { QuickAction } from "../../constants/quickActions";

const QuickActionCard = ({ action }: { action: QuickAction }) => (
  <Link
    href={action.href}
    className="flex h-9 items-center gap-2 rounded-[12px] bg-[#F9F9F9] px-3 text-sm text-[#474C48] transition-all hover:-translate-y-0.5 hover:bg-[#F0FFF6] hover:shadow-sm"
  >
    <span className="[&_svg]:size-4">{action.icon}</span>
    <span className="flex-1">{action.label}</span>
    <ArrowUpRight className="size-4" />
  </Link>
);

export default QuickActionCard;
