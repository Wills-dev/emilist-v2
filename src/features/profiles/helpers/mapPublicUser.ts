import type { PublicUserDetails } from "../api/fetchPublicUser";
import type { PersonProfile, ProfileKind } from "../types";

export const mapPublicUser = (user: PublicUserDetails, kind: ProfileKind): PersonProfile => ({
  id: user._id,
  kind,
  name: [user.firstName?.trim(), user.lastName?.trim()].filter(Boolean).join(" ") || user.fullName?.trim() || user.userName?.trim() || user.uniqueId || "User",
  image: user.displayImage,
  username: user.userName || user.uniqueId,
  bio: user.bio,
  verified: user.isVerified,
});
