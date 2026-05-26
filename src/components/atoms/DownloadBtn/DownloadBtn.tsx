import Image from "next/image";

const DownloadBtn = ({
  href,
  alt,
  width,
  height,
  imgUrl,
}: {
  href: string;
  alt: string;
  width: number;
  height: number;
  imgUrl: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center sm:gap-3 gap-2 bg-linear-to-b from-0% from-[#25C269] to-100% to-[#125C32] rounded-[8px] px-4 py-6 max-h-16"
    >
      <span className="block w-7 h-7">
        <Image
          src={imgUrl}
          alt={alt}
          width={width}
          height={height}
          className="object-contain"
        />
      </span>
      <span className="block text-white font-medium uppercase font-exo sm:text-sm text-xs leading-3.5">
        Download
      </span>
    </a>
  );
};

export default DownloadBtn;
