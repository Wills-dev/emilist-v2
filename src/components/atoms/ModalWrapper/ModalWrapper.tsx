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
}

const ModalWrapper = ({
  children,
  title,
  description,
  className,
  open,
  onClose,
}: ModalWrapperProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`dark:bg-gray-800 ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="w-full">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
