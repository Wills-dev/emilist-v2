import Image from "next/image";

const FormTitleWrapper = ({
  iconUrl = "/assets/icons/user-star.svg",
  title,
}: {
  iconUrl?: string;
  title: string;
}) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="bg-[#F4F7F5] h-8.5 w-8.5 rounded-[9px] flex justify-center items-center">
        <Image
          src={iconUrl}
          alt="icon"
          width={16}
          height={16}
          className="object-contain"
        />
      </div>
      <h6 className="font-bold sm:text-[30px] text-2xl font-exo leading-9">
        {title}
      </h6>
    </div>
  );
};

export default FormTitleWrapper;
