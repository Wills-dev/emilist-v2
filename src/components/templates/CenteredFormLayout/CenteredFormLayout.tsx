import Container from "@/components/atoms/Container/Container";
import FormNav from "@/components/molecules/FormNav/FormNav";

const CenteredFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full relative">
      <div className="w-full border-b border-[#E5E5E5] bg-white right-0 ">
        <FormNav />
      </div>
      <Container>
        <div className="pt-10  flex justify-center">
          <div className="max-w-140.25 w-full">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default CenteredFormLayout;
