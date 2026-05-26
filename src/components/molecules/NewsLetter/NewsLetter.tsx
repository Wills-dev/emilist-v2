import NesLetterForm from "../forms/NewsLetterForm/NesLetterForm";

const NewsLetter = () => {
  return (
    <section
      className={
        "flex items-end justify-between gap-10 flex-wrap  border-[#D9D9D9] border-b sm:pb-10 pb-6"
      }
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
