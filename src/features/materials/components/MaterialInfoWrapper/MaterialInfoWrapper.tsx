import Container from "@/components/atoms/Container/Container";
import MaterialMainInfo from "../MaterialMainInfo/MaterialMainInfo";
import MaterialReviewSummary from "../MaterialReviewSummary/MaterialReviewSummary";

const MaterialInfoWrapper = ({
  materialId,
  reviewLink,
}: {
  materialId: string;
  reviewLink: string;
}) => {
  return (
    <div className="pt-6 pb-15">
      <Container>
        <div className="w-full flex justify-between flex-wrap gap-6">
          <div className="max-w-197.75 w-full">
            <MaterialMainInfo materialId={materialId} />
          </div>
          <div className="max-w-96.75 w-full">
            <MaterialReviewSummary reviewLink={reviewLink} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MaterialInfoWrapper;
