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
      <div className="flex-1 w-full">
        <Button
          variant="default"
          className="w-full h-8 text-xs"
          href={routes?.marketplace.materialInfo(materialId)}
        >
          View More
        </Button>
      </div>

      {!isSeller && (
        <div className="flex-1 w-full">
          <MaterialAddToCartButton
            variant="secondary"
            className="w-full flex-1 h-8 text-xs"
            onClick={onAddToCart}
            isLoading={isAddingToCart}
          />
        </div>
      )}
    </div>
  );
};

export default MaterialCardActions;
