import Button from "@/components/atoms/Button/Button";
import MaterialAddToCartButton from "../MaterialAddToCartButton/MaterialAddToCartButton";

import { routes } from "@/lib/helpers/routes";

const MaterialCardActions = ({
  materialId,
  isSeller = false,
  onAddToCart,
  isAddingToCart = false,
}: {
  materialId: string;
  isSeller?: boolean;
  onAddToCart?: () => void;
  isAddingToCart?: boolean;
}) => {
  return (
    <div className="flex items-center w-full gap-2.5">
      <Button
        variant="default"
        className="w-full flex-1 h-8 text-xs"
        href={routes?.marketplace.materialInfo(materialId)}
      >
        View More
      </Button>
      {!isSeller && (
        <MaterialAddToCartButton
          variant="secondary"
          className="w-full flex-1 h-8 text-xs"
          onClick={onAddToCart}
          isLoading={isAddingToCart}
        />
      )}
    </div>
  );
};

export default MaterialCardActions;
