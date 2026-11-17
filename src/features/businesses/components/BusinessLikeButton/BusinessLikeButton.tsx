"use client";

import LikeButton from "@/components/molecules/LikeButton/LikeButton";
import { useToggleBusinessLike } from "../../hooks/useToggleBusinessLike";

const BusinessLikeButton = ({ businessId, liked }: { businessId: string; liked: boolean }) => {
  const like = useToggleBusinessLike(businessId, liked);
  return <LikeButton isLiked={like.liked} isLoading={like.busy} onToggleLike={like.toggle} />;
};

export default BusinessLikeButton;
