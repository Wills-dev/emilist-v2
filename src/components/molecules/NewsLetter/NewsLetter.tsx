import clsx from "clsx";
import NesLetterForm from "../forms/NewsLetterForm/NesLetterForm";

const NewsLetter = ({ variant }: { variant: "primary" | "secondary" }) => {
  const variants = {
    primary: {
      parent: "text-[#FBFFF8]",
    },
    secondary: {
      parent: "text-[#1A201B]",
    },
  };

  const styles = variants[variant];

  return (
    <section
      className={clsx(
        "flex items-end justify-between gap-10 flex-wrap  border-[#D9D9D9] border-b pb-6",
        styles.parent,
      )}
    >
      <div className="max-w-152.5 w-full min-w-72.5">
        <h6 className="font-exo sm:text-[30px] text-[25px] font-semibold">
          Subscribe to Our Newsletter
        </h6>
        <p className="font-exo leading-6">
          Be the first to get latest updates from us and get more information
          about our products
        </p>
      </div>
      <NesLetterForm />
    </section>
  );
};

export default NewsLetter;
