import Image from "next/image";

const ImagePreview = ({
  onCancel,
  imageUrl,
  alt,
}: {
  onCancel: () => void;
  imageUrl: string;
  alt: string;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div className="max-w-4xl w-full max-h-[90vh]  overflow-auto">
        <Image
          src={imageUrl}
          alt={alt}
          className="w-full h-auto rounded-lg"
          width={800}
          height={700}
        />
      </div>
    </div>
  );
};

export default ImagePreview;
