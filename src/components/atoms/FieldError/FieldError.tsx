const FieldError = ({
  id,
  message,
}: {
  id?: string;
  message?: string;
}) => {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="text-xs leading-5 text-[#D92D20]">
      {message}
    </p>
  );
};

export default FieldError;
