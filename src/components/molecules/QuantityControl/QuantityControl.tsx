import CounterButton from "@/components/atoms/CounterButton/CounterButton";
import MinusIcon from "@/components/atoms/icons/MinusIcon";
import PlusIcon from "@/components/atoms/icons/PlusIcon";

const QuantityControl = ({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) => {
  const addToCount = () => {
    console.log("id", id);
  };

  return (
    <div className="flex items-center gap-2">
      <CounterButton
        onClick={addToCount}
        icon={<MinusIcon />}
        disabled={quantity < 1 ? true : false}
      />
      <span className="block tracking-[-1.5%]">{quantity}</span>
      <CounterButton
        onClick={addToCount}
        icon={<PlusIcon />}
        disabled={false}
      />
    </div>
  );
};

export default QuantityControl;
