import CongratsContent from "@/components/molecules/CongratsContent/CongratsContent";
import FormNav from "@/components/molecules/FormNav/FormNav";

const CongratsPage = () => {
  return (
    <div className="h-screen w-full flex flex-col relative">
      <FormNav />
      <CongratsContent
        title="Expert Profile Complete!"
        desc="  Keep an eye out for job offers around you on the market place"
      />
    </div>
  );
};

export default CongratsPage;
