import Container from "@/components/atoms/Container/Container";
import JobMainInfo from "../JobMainInfo/JobMainInfo";
import JobMilestoneInfo from "../JobMilestoneInfo/JobMilestoneInfo";

const JobInfoWrapper = ({ jobId }: { jobId: string }) => {
  return (
    <div className="pt-6">
      <Container>
        <div className="w-full flex gap-10">
          <JobMainInfo />
          <div className="w-full">
            <JobMilestoneInfo />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default JobInfoWrapper;
