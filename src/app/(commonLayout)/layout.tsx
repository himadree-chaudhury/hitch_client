import Footer from "@/components/modules/shared/Footer";
import Navbar from "@/components/modules/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
