import FormNav from "@/components/molecules/FormNav/FormNav";
import ExpertFormWrapper from "@/features/experts/components/ExpertFormWrapper/ExpertFormWrapper";

const DashboardOfferServicePage = () => (
  <main className="min-h-screen bg-white">
    <div className="border-b border-[#E5E5E5] bg-white">
      <FormNav />
    </div>
    <div className="mx-auto flex w-full justify-center">
      <ExpertFormWrapper dashboard />
    </div>
  </main>
);

export default DashboardOfferServicePage;
