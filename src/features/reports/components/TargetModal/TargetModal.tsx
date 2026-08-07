"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

import { ReportTargets, TargetDuration } from "../../types";

const TargetModal = ({
  open,
  mode,
  targets,
  onClose,
  onSave,
}: {
  open: boolean;
  mode: "set" | "review";
  targets: ReportTargets;
  onClose: (open: boolean) => void;
  onSave: (targets: ReportTargets) => void;
}) => {
  const emptyTargets: ReportTargets = {
    duration: "monthly",
    referralsMade: "",
    friendsInvited: "",
    jobsDone: "",
    amountEarned: "",
  };
  const [draft, setDraft] = useState(
    mode === "review" ? targets : emptyTargets,
  );

  const updateField = (field: keyof ReportTargets, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(draft);
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title={mode === "set" ? "Set Targets" : "Review Targets"}
      className="max-w-125! rounded-2xl p-6"
      headerClassName="border-b border-[#E7EAE8] pb-5"
      titleClassName="text-[#474C48]"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-5">
        <fieldset className="border-b border-[#E7EAE8] pb-5">
          <legend className="mb-3 text-sm text-[#555B57]">
            Target Duration
          </legend>
          <div className="flex items-center gap-6">
            {(["monthly", "annual"] as TargetDuration[]).map((duration) => (
              <label key={duration} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="target-duration"
                  value={duration}
                  checked={draft.duration === duration}
                  onChange={() => updateField("duration", duration)}
                  className="size-5 accent-[#25C269]"
                />
                <span className="capitalize">{duration}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["referralsMade", "Referrals Made", "Enter number"],
            ["friendsInvited", "Friends Invited", "Enter number"],
            ["jobsDone", "Jobs Done", "Enter number"],
            ["amountEarned", "Amount Earned", "Enter amount"],
          ].map(([field, label, placeholder]) => (
            <label key={field} className="space-y-2 text-sm text-[#555B57]">
              <span>{label}</span>
              <Input
                type="number"
                min="0"
                value={draft[field as keyof ReportTargets]}
                onChange={(event) =>
                  updateField(field as keyof ReportTargets, event.target.value)
                }
                placeholder={placeholder}
              />
            </label>
          ))}
        </div>

        <Button type="submit" variant="primary" className="w-full">
          {mode === "set" ? "Submit" : "Make Changes"}
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default TargetModal;
