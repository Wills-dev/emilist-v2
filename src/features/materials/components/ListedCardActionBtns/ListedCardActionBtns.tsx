"use client";

import EditIcon from "@/components/atoms/icons/EditIcon";
import ItemActionButton from "@/components/atoms/ItemActionButton/ItemActionButton";

const ListedCardActionBtns = ({
  onEditListing,
  onArchiveListing,
}: {
  onEditListing: () => void;
  onArchiveListing: () => void;
}) => {
  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
};

export default ListedCardActionBtns;
