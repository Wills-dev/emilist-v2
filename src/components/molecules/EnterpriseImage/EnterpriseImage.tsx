import DeleteBtn from "@/components/atoms/DeleteBtn/DeleteBtn";
import PlusIcon from "@/components/atoms/icons/PlusIcon";

import Image from "next/image";

const EnterpriseImage = ({
  previews,
  removeImg,
  handleChangeImages,
}: {
  previews: string[];
  removeImg: (i: number) => void;
  handleChangeImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="space-y-2 pb-6 border-b border-[#E5E5E5] w-full col-span-2">
      <label
        htmlFor="image"
        className="flex items-center gap-2 text-[#6667FF] text-sm font-semibold"
      >
        <PlusIcon />
        <span>Upload images</span>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          multiple
          onChange={handleChangeImages}
          className="invisible h-0 w-0"
        />
      </label>
      {previews.length > 0 && (
        <div className="flex gap-2">
          {previews?.map((image, i) => (
            <div
              key={i}
              className="max-w-12 w-12 h-12 overflow-hidden rounded-lg bg-gray-100  relative shrink-0"
            >
              <Image
                src={image}
                alt="image-preview"
                width={48}
                height={48}
                className="object-cover w-full h-full max-w-full"
              />
              <DeleteBtn removeImg={() => removeImg(i)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnterpriseImage;
