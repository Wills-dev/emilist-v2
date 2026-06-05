import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";

const PolicyModal = ({
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
      title="Privacy Policy"
      className=" max-w-140! w-full sm:p-8 p-6"
      description="Learn how Emilist collects, uses, stores, and protects your personal information when you use our platform."
    >
      TermsOfUseModal
    </ModalWrapper>
  );
};

export default PolicyModal;
