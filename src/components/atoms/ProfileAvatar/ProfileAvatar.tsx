import Image from "next/image";

const ProfileAvatar = ({ profileImage }: { profileImage?: string }) => {
  const userAvatar = profileImage || "/assets/images/avatar.svg";

  return (
    <div className="w-10 h-10 bg-white rounded-full">
      <Image
        src={userAvatar}
        alt="user avatar"
        width={40}
        height={40}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ProfileAvatar;
