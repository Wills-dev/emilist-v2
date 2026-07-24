import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

const MobileFilterModal = ({
  open,
  onClose,
  onReset,
  hasFilters,
  children,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  onReset: () => void;
  hasFilters: boolean;
  children: React.ReactNode;
}) => {
  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Filters"
      className="xl:hidden max-w-[calc(100%-2rem)] sm:max-w-lg"
      headerClassName="border-b border-[#ECECEC] pb-4"
    >
      <div className="space-y-6 pt-2">
        {children}
        <div className="flex gap-3 border-t border-[#ECECEC] pt-4">
          <Button
            type="button"
            variant="default"
            className="h-11 flex-1"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          {hasFilters && (
            <Button
              type="button"
              variant="danger"
              className="h-11 flex-1"
              onClick={onReset}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default MobileFilterModal;
