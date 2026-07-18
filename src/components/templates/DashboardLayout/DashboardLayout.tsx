import DashboardNav from "@/components/molecules/DashboardNav/DashboardNav";
import DashboardSidebar from "@/components/organisms/DashboardSidebar/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full w-full overflow-hidden text-gray-700 bg-[#F4F7F5]">
      <DashboardNav />
      <DashboardSidebar />
      <div className="flex">
        <div className=""></div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
