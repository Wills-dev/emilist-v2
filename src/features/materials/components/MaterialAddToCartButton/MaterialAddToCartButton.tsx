import { Loader2 } from "lucide-react";

import Button from "@/components/atoms/Button/Button";

const MaterialAddToCartButton = ({
  onClick,
  isLoading = false,
  disabled = false,
  variant = "primary",
  className,
}: {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}) => {
  return (
    <Button
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled || isLoading || !onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Adding to cart...
        </>
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
};

export default MaterialAddToCartButton;
