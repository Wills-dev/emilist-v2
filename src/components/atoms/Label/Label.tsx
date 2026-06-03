const Label = ({ htmlFor, title }: { htmlFor: string; title: string }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[#474C48] font-medium font-exo max-sm:text-sm"
    >
      {title}
    </label>
  );
};

export default Label;
