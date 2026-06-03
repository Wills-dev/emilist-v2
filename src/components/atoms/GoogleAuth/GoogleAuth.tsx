import Image from "next/image";

const GoogleAuth = () => {
  return (
    <button className="w-full h-11 rounded-[10px] flex justify-center items-center gap-2 bg-[#FBFFF8] hover:bg-[#ecfbe1] border border-[#F1F2F9] cursor-pointer transition-all duration-300">
      <Image
        src="/assets/images/google.svg"
        alt="google logo"
        width={32}
        height={32}
        className="sm:w-8 w-6 sm:h-8 h-6"
      />{" "}
      <span className="font-semibold max-sm:text-sm">Google Sign Up</span>
    </button>
  );
};

export default GoogleAuth;
