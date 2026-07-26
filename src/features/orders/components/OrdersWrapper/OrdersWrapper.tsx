import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";
import PackageIcon from "@/components/atoms/icons/PackageIcon";
import Select from "@/components/atoms/Select/Select";
import { sortOptions } from "@/lib/constants/filter";

const OrdersWrapper = () => {
  return (
    <Container variant="small">
      <div className="pt-6 pb-15 space-y-10">
        <DashboardTitle title="Orders" icon={<PackageIcon />} />
        <BackButton isDashboard />
        <div className="bg-linear-to-b from-0% from-white to-100% to-[#FBFBFB] border border-[#F1F2F9] rounded-[12.75px] space-y-5 px-5 py-6">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F2F9]">
            <p className="text-sm font-exo font-semibold">3 Orders</p>
            <div className="w-full max-w-40">
              <Select
                options={sortOptions}
                variant="secondary"
                fontSize="14px"
                placeholder="Sort by"
                aria-label="Sort orders"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrdersWrapper;
