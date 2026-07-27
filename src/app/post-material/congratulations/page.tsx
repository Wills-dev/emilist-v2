import CongratsContent from "@/components/molecules/CongratsContent/CongratsContent";
import FormNav from "@/components/molecules/FormNav/FormNav";
import { routes } from "@/lib/helpers/routes";

const page = () => {
  return (
    <div className="h-screen w-full flex flex-col relative">
      <FormNav />
      <CongratsContent
        title="Your product is live on Emilist"
        desc="Keep an eye on your dashboard for sales and inquiries from prospective buyers"
        href={routes?.dashboardLinks.listedMaterials}
      />
    </div>
  );
};

export default page;
