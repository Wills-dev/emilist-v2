import GrayedLogo from "@/components/atoms/GrayedLogo/GrayedLogo";
import SeeAllBtn from "@/components/atoms/SeeAllBtn/SeeAllBtn";
import SellersMaterialCardWrap from "../SellersMaterialCardWrap/SellersMaterialCardWrap";
import Container from "@/components/atoms/Container/Container";

const PublicSellersOtherMaterials = () => {
  return (
    <Container
      variant="center"
      className="bg-[#F4F7F5] relative overflow-hidden w-full"
    >
      <GrayedLogo variant="secondary" />
      <div className=" backdrop-blur-md w-full">
        <div className="py-15 w-full">
          <div className="flex flex-wrap gap-4 w-full">
            <div className="pt-8 space-y-4 max-w-96.25 w-full min-w-72.5">
              <div className="space-y-2">
                <span className="text-[#18A154]">
                  <svg
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.89062 21.5871L21.589 8.88867M21.589 21.5871V8.88867H8.89062"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h6 className="font-bold font-exo sm:text-[30px] text-2xl leading-10 text-[#18A154]">
                  Other products from Arthur Phillips
                </h6>
                <p className="text-[#333E49] text-sm leading-6">
                  Explore other bestsellers from this merchant and discover
                  other quality products you might need for your project.
                </p>
              </div>
              <SeeAllBtn link="" />
            </div>
            <div className="flex-1 w-full">
              <SellersMaterialCardWrap />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PublicSellersOtherMaterials;
