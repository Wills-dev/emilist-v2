import clsx from "clsx";
import Image from "next/image";

const ProfileAvatar = ({
  profileImage,
  variant = "small",
}: {
  profileImage?: string;
  variant?: "small" | "large";
}) => {
  const userAvatar = profileImage || "/assets/images/avatar.svg";

  const variants = {
    small: "w-10 h-10",
    large: "sm:w-20.25 sm:h-20-25 w-10 h-10",
  };

  const styles = variants[variant];

  return (
    <div className={clsx(styles, "bg-white rounded-full overflow-hidden")}>
      <Image
        src={userAvatar}
        alt="user avatar"
        width={40}
        height={40}
        className="object-cover w-full h-full rounded-full"
      />
    </div>
  );
};

export default ProfileAvatar;
