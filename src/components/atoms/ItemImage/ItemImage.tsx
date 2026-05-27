import Image from "next/image";

const ItemImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="max-w-[339.5px] w-full h-45 rounded-[12px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={339.5}
        height={180}
        className="w-full h-full object-cover rounded-[12px]"
      />
    </div>
  );
};

export default ItemImage;
