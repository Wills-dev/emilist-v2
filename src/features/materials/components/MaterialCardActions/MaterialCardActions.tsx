import Button from "@/components/atoms/Button/Button";

import { routes } from "@/lib/helpers/routes";

const MaterialCardActions = ({ materialId }: { materialId: string }) => {
  return (
    <div className="flex items-center w-full gap-2.5">
      <Button
        variant="default"
        className="w-full flex-1 h-8 text-xs"
        href={routes?.marketplace.materialInfo(materialId)}
      >
        View More
      </Button>
      <Button variant="secondary" className="w-full flex-1 h-8 text-xs">
        Add to Cart
      </Button>
    </div>
  );
};

export default MaterialCardActions;
