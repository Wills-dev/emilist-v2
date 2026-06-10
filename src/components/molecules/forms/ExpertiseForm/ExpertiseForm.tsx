import CertificateWrap from "@/features/experts/components/CertificateWrap/CertificateWrap";
import InsuranceWrap from "@/features/experts/components/InsuranceWrap/InsuranceWrap";
import MembershipWrap from "@/features/experts/components/MembershipWrap/MembershipWrap";

const ExpertiseForm = () => {
  return (
    <div className="space-y-12">
      <CertificateWrap />
      <MembershipWrap />
      <InsuranceWrap />
    </div>
  );
};

export default ExpertiseForm;
