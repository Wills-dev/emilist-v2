import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = ({ className = "", ...props }: TextareaProps) => {
  return (
    <textarea
      style={{ fontSize: "16px" }}
      className={`backdrop-blur-2xl bg-[#ECECEC] text-[#737774] rounded-[10px] border border-gray-200 transition-all w-full focus:border-[#25C269] duration-300 px-3 py-2 outline-none placeholder-gray-400 ${className}`}
      {...props}
    ></textarea>
  );
};

export default Textarea;
