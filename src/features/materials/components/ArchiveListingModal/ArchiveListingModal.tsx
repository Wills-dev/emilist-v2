"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { useArchiveMaterial } from "../../hooks/useArchiveMaterial";

const ArchiveListingModal = ({
  productId,
  open,
  onClose,
}: {
  productId: string;
  open: boolean;
  onClose: (open: boolean) => void;
}) => {
  const { archiveMaterial, isArchiving } = useArchiveMaterial(() =>
    onClose(false),
  );

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Archive Listing"
      className="max-w-lg"
      headerClassName="border-b border-[#ECECEC] pb-4"
    >
      <div className="space-y-8 pt-4">
        <p className="text-base text-[#667085] sm:text-lg">
          Remove listing from the marketplace?
        </p>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="default"
            className="h-11 flex-1"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            className="h-11 flex-1"
            loading={isArchiving}
            onClick={() => archiveMaterial(productId)}
          >
            Yes, Archive
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ArchiveListingModal;
