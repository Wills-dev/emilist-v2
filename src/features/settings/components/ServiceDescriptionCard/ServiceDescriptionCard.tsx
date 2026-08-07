"use client";

import { useState } from "react";

import Button from "@/components/atoms/Button/Button";
import Textarea from "@/components/atoms/TextArea/Textarea";
import { UserExpertService } from "../../types/expertService";

const ServiceDescriptionCard = ({
  expert,
  onSave,
}: {
  expert: UserExpertService;
  onSave: (expert: UserExpertService) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(expert.businessDescription);

  const cancelEditing = () => {
    setDescription(expert.businessDescription);
    setEditing(false);
  };

  return (
    <div className="min-h-38 rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-exo font-medium">Business Description</h3>
        <Button
          variant="secondary"
          className="h-8 px-3! py-2 text-xs"
          onClick={() => setEditing(true)}
        >
          Edit
        </Button>
      </div>
      {editing ? (
        <>
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-4 min-h-28"
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button
              variant="default"
              className="h-8 px-3! py-2 text-xs"
              onClick={cancelEditing}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="h-8 px-3! py-2 text-xs"
              onClick={() => {
                onSave({ ...expert, businessDescription: description });
                setEditing(false);
              }}
            >
              Save
            </Button>
          </div>
        </>
      ) : (
        <p className="mt-5 text-sm leading-6 text-[#737774]">
          {expert.businessDescription}
        </p>
      )}
    </div>
  );
};

export default ServiceDescriptionCard;

