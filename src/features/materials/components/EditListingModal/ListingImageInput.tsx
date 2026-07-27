import Image from "next/image";
import { ImagePlus, Loader, X } from "lucide-react";

import { ExistingMaterialImage } from "./types";

const ListingImageInput = ({
  existingImages,
  newPreviews,
  deletingImageId,
  addImages,
  removeExistingImage,
  removeNewImage,
}: {
  existingImages: ExistingMaterialImage[];
  newPreviews: string[];
  deletingImageId?: string;
  addImages: React.ChangeEventHandler<HTMLInputElement>;
  removeExistingImage: (image: ExistingMaterialImage) => void;
  removeNewImage: (index: number) => void;
}) => (
  <div className="flex min-h-24 flex-wrap gap-2 rounded-[10px] bg-[#ECECEC] p-2">
    {existingImages.map((image) => (
      <ImagePreview
        key={image._id}
        src={image.imageUrl}
        onRemove={() => removeExistingImage(image)}
        loading={deletingImageId === image._id}
      />
    ))}
    {newPreviews.map((preview, index) => (
      <ImagePreview
        key={preview}
        src={preview}
        onRemove={() => removeNewImage(index)}
      />
    ))}
    <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-[10px] border border-dashed border-[#A2A4A2] bg-white text-[#737774]">
      <ImagePlus className="size-5" />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={addImages}
        className="sr-only"
      />
    </label>
  </div>
);

const ImagePreview = ({
  src,
  onRemove,
  loading = false,
}: {
  src: string;
  onRemove: () => void;
  loading?: boolean;
}) => (
  <div className="relative h-20 w-20 overflow-hidden rounded-[10px] bg-white">
    <Image src={src} alt="Material" fill className="object-cover" />
    <button
      type="button"
      onClick={onRemove}
      disabled={loading}
      aria-label="Remove image"
      className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-white/90 text-[#474C48]"
    >
      {loading ? (
        <Loader className="size-3 animate-spin" />
      ) : (
        <X className="size-3" />
      )}
    </button>
  </div>
);

export default ListingImageInput;
