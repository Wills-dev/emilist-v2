import Image from "next/image";

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return "/assets/icons/pdf.svg";

    case "doc":
    case "docx":
      return "/assets/icons/word.svg";

    default:
      return null;
  }
};

const FileName = ({ fileName }: { fileName: string }) => {
  const icon = getFileIcon(fileName);

  return (
    <div className="flex items-center gap-1 bg-white px-2 py-px rounded-[32px]">
      {icon && <Image src={icon} alt="" width={18.13} height={18.13} />}

      <span className="text-sm text-[#737774]">{fileName}</span>
    </div>
  );
};

export default FileName;
