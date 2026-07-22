import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  open: boolean;
  onClose: (open: boolean) => void;
  titleClassName?: string;
  descClassName?: string;
  headerClassName?: string;
}

const ModalWrapper = ({
  children,
  title,
  description,
  className,
  open,
  onClose,
  titleClassName,
  descClassName,
  headerClassName,
}: ModalWrapperProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`overflow-hidden ${className}`}>
        <DialogHeader className={headerClassName}>
          <DialogTitle
            className={`font-exo font font-bold sm:text-[24px] text-lg ${titleClassName}`}
          >
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription
              className={`${descClassName} font-exo text-[#303632]`}
            >
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="w-full max-h-[80vh] overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
