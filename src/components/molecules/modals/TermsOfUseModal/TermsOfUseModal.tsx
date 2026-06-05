import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

const TermsOfUseModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <ModalWrapper
      open={isOpen}
      onClose={onClose}
      title="Terms of Use"
      className=" max-w-140! w-full sm:p-8 p-6"
      description="Please read our Terms of Use carefully to understand the rules, responsibilities, and conditions for using Emilist"
    >
      TermsOfUseModal
    </ModalWrapper>
  );
};

export default TermsOfUseModal;
