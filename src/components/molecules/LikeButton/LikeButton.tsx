import LikeIcon from "@/components/atoms/icons/LikeIcon";
import IconWrapper from "@/components/atoms/IconWrapper/IconWrapper";

const LikeButton = ({
  onToggleLike,
  isLiked,
}: {
  onToggleLike: () => void;
  isLiked: boolean;
}) => {
  const iconColor = isLiked ? "text-[#FF5D7A]" : "text-[#737774]";

  return (
    <IconWrapper onClick={onToggleLike} textColor={iconColor}>
      <LikeIcon />
    </IconWrapper>
  );
};

export default LikeButton;
