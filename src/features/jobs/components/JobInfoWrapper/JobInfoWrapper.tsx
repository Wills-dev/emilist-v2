import Container from "@/components/atoms/Container/Container";
import JobMainInfo from "../JobMainInfo/JobMainInfo";
import JobMilestoneInfo from "../JobMilestoneInfo/JobMilestoneInfo";

const JobInfoWrapper = ({ jobId }: { jobId: string }) => {
  return (
    <div className="pt-6 space-y-10">
      <Container>
        <div className="w-full flex flex-wrap gap-10">
          <JobMainInfo jobId={jobId} />
          <div className="max-w-119.25 w-full max-sm:hidden">
            <JobMilestoneInfo />
          </div>
        </div>
      </Container>
      <div className="sm:hidden">
        <JobMilestoneInfo />
      </div>
    </div>
  );
};

export default JobInfoWrapper;
