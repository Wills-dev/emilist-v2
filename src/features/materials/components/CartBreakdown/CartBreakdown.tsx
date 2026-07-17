import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";

const CartBreakdown = () => {
  return (
    <Container>
      <div className="pt-6 pb-15 space-y-10">
        <BackButton />
        <div className="w-full flex justify-between flex-wrap gap-6">
          <div className="max-w-197.75 w-full"></div>
          <div className="max-w-96.75 w-full"></div>
        </div>
      </div>
    </Container>
  );
};

export default CartBreakdown;
