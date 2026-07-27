import CounterButton from "@/components/atoms/CounterButton/CounterButton";
import MinusIcon from "@/components/atoms/icons/MinusIcon";
import PlusIcon from "@/components/atoms/icons/PlusIcon";

const QuantityControl = ({
  quantity,
  onIncrement,
  onDecrement,
  disabled = false,
}: {
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center sm:gap-4 gap-2">
      <CounterButton
        onClick={onDecrement ?? (() => {})}
        icon={<MinusIcon />}
        disabled={disabled || quantity <= 1 || !onDecrement}
      />
      <span className="block tracking-[-1.5%] max-sm:text-xs">{quantity}</span>
      <CounterButton
        onClick={onIncrement ?? (() => {})}
        icon={<PlusIcon />}
        disabled={disabled || !onIncrement}
      />
    </div>
  );
};

export default QuantityControl;
