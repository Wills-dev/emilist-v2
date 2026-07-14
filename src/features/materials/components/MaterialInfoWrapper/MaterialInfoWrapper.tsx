import Container from "@/components/atoms/Container/Container";
import MaterialMainInfo from "../MaterialMainInfo/MaterialMainInfo";
import MaterialReviewSummary from "../MaterialReviewSummary/MaterialReviewSummary";

const MaterialInfoWrapper = ({ materialId }: { materialId: string }) => {
  return (
    <div className="pt-6 space-y-10">
      <Container>
        <div className="w-full flex justify-between flex-wrap gap-10">
          <div className="max-[791px] w-full">
            <MaterialMainInfo />
          </div>
          <div className="max-w-96.75 w-full">
            <MaterialReviewSummary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MaterialInfoWrapper;
