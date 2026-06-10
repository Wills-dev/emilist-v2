import { Plus } from "lucide-react";

const AddMoreBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center font-exo font-semibold gap-2 text-[#6667FF] cursor-pointer"
    >
      <Plus className="size-4" />
      <span>Add more</span>
    </button>
  );
};

export default AddMoreBtn;
