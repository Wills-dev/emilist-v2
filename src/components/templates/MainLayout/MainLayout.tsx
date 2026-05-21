import Navbar from "@/components/organisms/Navbar/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full w-full overflow-hidden text-gray-700 bg-[#FBFFF8]">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
