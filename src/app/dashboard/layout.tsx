import Navbar from "@/app/ui/dashboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <Navbar />
        <div className="px-[300px]">
          {children}
        </div>
      </>
    );
  }