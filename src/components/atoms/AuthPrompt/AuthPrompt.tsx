import Link from "next/link";

interface AuthPromptProps {
  text: string;
  actionText: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const AuthPrompt = ({
  text,
  actionText,
  href,
  onClick,
  className = "",
}: AuthPromptProps) => {
  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      <p className="sm:text-sm text-xs">
        {text}{" "}
        {href ? (
          <Link
            href={href}
            className="text-[#25C269] hover:text-green-700 transition-colors duration-300"
          >
            {actionText}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onClick}
            className="text-[#25C269] hover:text-green-700 cursor-pointer transition-colors duration-300"
          >
            {actionText}
          </button>
        )}
      </p>
    </div>
  );
};

export default AuthPrompt;
