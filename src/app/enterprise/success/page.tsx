import CongratsContent from "@/components/molecules/CongratsContent/CongratsContent";
import FormNav from "@/components/molecules/FormNav/FormNav";

const page = () => {
  return (
    <div className="h-screen w-full flex flex-col relative">
      <FormNav />
      <CongratsContent
        title="We’ve received your request successfully"
        desc="Thanks for choosing Emilist, a representative will reach out to you shortly to process your request"
      />
    </div>
  );
};

export default page;
