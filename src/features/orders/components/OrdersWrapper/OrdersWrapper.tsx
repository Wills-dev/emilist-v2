"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";
import PackageIcon from "@/components/atoms/icons/PackageIcon/PackageIcon";
import OrderViewTabs from "../OrderViewTabs/OrderViewTabs";
import BuyerOrdersList from "../BuyerOrdersList/BuyerOrdersList";
import SalesWrapper from "../SalesWrapper/SalesWrapper";

export default function OrdersWrapper() {
  const params = useSearchParams();
  const sales = params.get("tab") === "sales";
  const reduceMotion = useReducedMotion();
  return (
    <Container variant="small">
      <div className="space-y-6 pb-15 pt-6">
        <DashboardTitle title={sales ? "Sales" : "Orders"} icon={<PackageIcon />} />
        <div className="flex items-center justify-between gap-3"><BackButton isDashboard /><OrderViewTabs sales={sales} /></div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={sales ? "sales" : "orders"}
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
            className="min-w-0"
          >
            {sales ? <SalesWrapper /> : <BuyerOrdersList />}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
}
