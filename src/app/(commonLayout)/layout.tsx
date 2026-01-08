import Footer from "@/components/modules/shared/Footer";
import Navbar from "@/components/modules/shared/Navbar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
