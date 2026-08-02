import {
  BadgePlus,
  Banknote,
  BriefcaseBusiness,
  HandCoins,
  Megaphone,
  Package,
  ShoppingCart,
  Store,
  UserRoundSearch,
  WalletCards,
} from "lucide-react";

import { routes } from "@/lib/helpers/routes";

export interface QuickAction {
  id: string;
  label: string;
  href: string;
  icon: React.ReactElement;
}

export const quickActions: QuickAction[] = [
  { id: "post-job", label: "Post a job", href: routes.postJob, icon: <BadgePlus /> },
  {
    id: "hire-expert",
    label: "Hire expert directly",
    href: routes.dashboardLinks.experts,
    icon: <UserRoundSearch />,
  },
  {
    id: "offer-service",
    label: "Offer a service",
    href: routes.dashboardLinks.offerService,
    icon: <HandCoins />,
  },
  {
    id: "manage-services",
    label: "Manage services",
    href: routes.dashboard,
    icon: <BriefcaseBusiness />,
  },
  {
    id: "sell-materials",
    label: "Sell materials",
    href: routes.postMaterial,
    icon: <Store />,
  },
  {
    id: "listed-items",
    label: "View listed items",
    href: routes.dashboardLinks.listedMaterials,
    icon: <Package />,
  },
  {
    id: "orders",
    label: "My orders",
    href: routes.dashboardLinks.orders,
    icon: <ShoppingCart />,
  },
  {
    id: "cart",
    label: "View cart",
    href: routes.dashboardLinks.dashboardCart,
    icon: <ShoppingCart />,
  },
  {
    id: "promotions",
    label: "Manage promotions",
    href: routes.dashboard,
    icon: <Megaphone />,
  },
  {
    id: "deposit",
    label: "Deposit funds",
    href: routes.dashboardLinks.payments,
    icon: <Banknote />,
  },
  {
    id: "withdraw",
    label: "Withdraw funds",
    href: routes.dashboardLinks.payments,
    icon: <WalletCards />,
  },
];
