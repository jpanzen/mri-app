import Navbar from "@/app/ui/dashboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <Navbar />
        <div  className="2xl:px-[300px] lg:px-[120px] md:px-[60px] px-[20px]">
          {children}
        </div>
      </>
    );
  }