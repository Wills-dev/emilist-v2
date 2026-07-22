import LikeIcon from "@/components/atoms/icons/LikeIcon";
import IconWrapper from "@/components/atoms/IconWrapper/IconWrapper";

const LikeButton = ({
  onToggleLike,
  isLiked,
  isLoading = false,
  className = "text-sm px-2 py-1.5",
}: {
  onToggleLike: () => void;
  isLiked: boolean;
  isLoading?: boolean;
  className?: string;
}) => {
  const iconColor = isLiked ? "text-[#FF5D7A]" : "text-[#737774]";

  return (
    <IconWrapper
      onClick={onToggleLike}
      textColor={iconColor}
      className={className}
      disabled={isLoading}
    >
      <LikeIcon />
    </IconWrapper>
  );
};

export default LikeButton;
