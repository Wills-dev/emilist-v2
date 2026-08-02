"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { quickActions } from "../../constants/quickActions";

const MAX_ACTIONS = 6;

const QuickActionsModal = ({
  open,
  onClose,
  selectedIds,
  onSave,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  selectedIds: string[];
  onSave: (ids: string[]) => void;
}) => {
  const [draftIds, setDraftIds] = useState(selectedIds);

  const toggleAction = (id: string) => {
    setDraftIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length < MAX_ACTIONS
          ? [...current, id]
          : current,
    );
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Customise Quick Actions"
      description="Select the 6 buttons you need on your dashboard for a quicker experience"
      className="max-w-4xl!"
      headerClassName="border-b border-[#ECECEC] pb-4"
      descClassName="pt-3 text-[#667085]!"
    >
      <div className="space-y-7 pt-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const checked = draftIds.includes(action.id);
            return (
              <div
                key={action.id}
                className="flex items-center gap-2 rounded-[10px] bg-[#F8F8F8] p-2"
              >
                <Checkbox
                  value={checked}
                  onChange={() => toggleAction(action.id)}
                  ariaLabel={`Select ${action.label}`}
                />
                <button
                  type="button"
                  onClick={() => toggleAction(action.id)}
                  className="flex flex-1 items-center gap-2 rounded-md bg-white p-2 text-left text-sm text-[#737774]"
                >
                  <span className="[&_svg]:size-4">{action.icon}</span>
                  <span className="flex-1">{action.label}</span>
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3">
          <Button
            variant="default"
            className="h-11 flex-1"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="h-11 flex-1"
            disabled={draftIds.length !== MAX_ACTIONS}
            onClick={() => {
              onSave(draftIds);
              onClose(false);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default QuickActionsModal;
