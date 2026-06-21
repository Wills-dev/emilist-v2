const DeleteBtn = ({ removeImg }: { removeImg: () => void }) => {
  return (
    <button
      type="button"
      onClick={removeImg}
      className="absolute right-0.5 top-0.5 rounded-full bg-red-500 px-2 py-1 text-xs text-white cursor-pointer"
    >
      ×
    </button>
  );
};

export default DeleteBtn;
