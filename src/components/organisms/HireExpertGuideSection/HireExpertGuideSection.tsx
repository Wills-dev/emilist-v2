import ArrowGuide from "@/components/atoms/ArrowGuide/ArrowGuide";
import Container from "@/components/atoms/Container/Container";
import BankNote from "@/components/atoms/icons/BankNote";
import BicepsFlex from "@/components/atoms/icons/BicepsFlex";
import NoteBook from "@/components/atoms/icons/NoteBook";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import HireExpertGuideCard from "@/components/molecules/HireExpertGuideCard/HireExpertGuideCard";

const HireExpertGuideSection = () => {
  return (
    <section className="md:pb-20 md:pt-15 pb-10 pt-7.5">
      <Container>
        <div className="sm:space-y-8 space-y-6">
          <div className="flex justify-center">
            <SectionTitle title="Hire an expert in 3 steps" />
          </div>
          <div className="flex items-center justify-center gap-4 max-lg:flex-col">
            <HireExpertGuideCard
              index={1}
              icon={<NoteBook />}
              title="Post Your Job"
              desc="List the service you need, your location, timeline and budget. We’ll match you with verified service teams to work on your project quickly."
            />
            <ArrowGuide />
            <HireExpertGuideCard
              index={2}
              icon={<BicepsFlex />}
              title="Hire Experts & Track Your Job"
              desc="Review expert profiles, agree on timelines, hire your preferred candidate and track your project’s progress from start to finish."
            />
            <ArrowGuide />
            <HireExpertGuideCard
              index={3}
              icon={<BankNote />}
              title="Pay When the Job Is Done"
              desc="Your payment is held safely by Emilist and released to the service provider only when the job is completed to your satisfaction."
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HireExpertGuideSection;
