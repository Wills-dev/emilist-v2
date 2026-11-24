"use client";

import type { ReactNode } from "react";
import EditIcon from "@/components/atoms/icons/EditIcon/EditIcon";
import ItemActionButton from "@/components/atoms/ItemActionButton/ItemActionButton";

const ListedCardActionBtns = ({
  onEditListing,
  onArchiveListing,
  promoActions,
}: {
  promoActions?: ReactNode;
  onEditListing: () => void;
  onArchiveListing: () => void;
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ItemActionButton
        title="Edit listing"
        onClick={onEditListing}
        className="text-[#6667FF]"
        icon={<EditIcon />}
      />
      <ItemActionButton
        title="Archive listing"
        onClick={onArchiveListing}
        className="text-[#6667FF]"
      />
      {promoActions}
    </div>
  );
};

export default ListedCardActionBtns;
