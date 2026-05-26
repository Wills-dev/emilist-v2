import Footer from "@/components/organisms/Footer/Footer";
import Navbar from "@/components/organisms/Navbar/Navbar";

const MainLayout = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => {
  return (
    <div className="min-h-screen h-full w-full overflow-hidden text-gray-700 bg-white">
      <Navbar />
      <main>{children}</main>
      <Footer variant={variant} />
    </div>
  );
};

export default MainLayout;
