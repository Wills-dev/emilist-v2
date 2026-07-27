"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { OtherSellerProduct } from "../../types";
import EditListingFields, { Field } from "./EditListingFields";
import ListingImageInput from "./ListingImageInput";
import { useEditListingForm } from "./useEditListingForm";
import { useListingImages } from "./useListingImages";

const EditListingModal = ({
  material,
  open,
  onClose,
}: {
  material: OtherSellerProduct;
  open: boolean;
  onClose: (open: boolean) => void;
}) => {
  const images = useListingImages(material);
  const form = useEditListingForm({
    material,
    images: images.newImages,
    onSuccess: () => onClose(false),
  });

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Edit Listing"
      description="Make updates or changes to your product listing"
      className="max-w-3xl!"
      headerClassName="border-b border-[#ECECEC] pb-4"
    >
      <form onSubmit={form.handleSubmit} className="space-y-5 pt-4">
        <EditListingFields form={form.form} setField={form.setField} />

        <Field label="Product images">
          <ListingImageInput
            existingImages={images.existingImages}
            newPreviews={images.newPreviews}
            deletingImageId={images.deletingImageId}
            addImages={images.addImages}
            removeExistingImage={images.removeExistingImage}
            removeNewImage={images.removeNewImage}
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="default"
            className="h-11 flex-1"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="h-11 flex-1"
            loading={form.isUpdating}
            disabled={!form.canSubmit}
          >
            Confirm
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditListingModal;
