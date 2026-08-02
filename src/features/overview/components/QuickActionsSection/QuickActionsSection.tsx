"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

import { quickActions } from "../../constants/quickActions";

import QuickActionCard from "../QuickActionCard/QuickActionCard";
import QuickActionsModal from "../QuickActionsModal/QuickActionsModal";
import {
  DEFAULT_QUICK_ACTIONS,
  useDashboardPreferencesStore,
} from "@/store/dashboardPreferencesStore";
import { useStore } from "@/store/authStore";

const QuickActionsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const userId = useStore((state) => state.currentUser?._id ?? "guest");
  const quickActionsByUser = useDashboardPreferencesStore(
    (state) => state.quickActionsByUser,
  );
  const selectedIds = quickActionsByUser[userId] ?? DEFAULT_QUICK_ACTIONS;
  const setQuickActionIds = useDashboardPreferencesStore(
    (state) => state.setQuickActionIds,
  );
  const selectedActions = selectedIds
    .map((id) => quickActions.find((action) => action.id === id))
    .filter((action): action is NonNullable<typeof action> => Boolean(action));

  return (
    <section className="space-y-3 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-exo font-semibold">Quick Actions</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label="Customise quick actions"
          className="grid size-8 place-items-center rounded-[10px] bg-[#ECEFF1]"
        >
          <MoreVertical className="size-4" />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {selectedActions.map((action) => (
          <div key={action.id} className="bg-white p-4">
            <QuickActionCard action={action} />
          </div>
        ))}
      </div>
      {modalOpen && (
        <QuickActionsModal
          open={modalOpen}
          onClose={setModalOpen}
          selectedIds={selectedIds}
          onSave={(ids) => setQuickActionIds(userId, ids)}
        />
      )}
    </section>
  );
};

export default QuickActionsSection;
