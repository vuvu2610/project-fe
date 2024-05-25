import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <div className="h-24 fixed w-full z-10">
        <Header />
      </div>
      <div className="pt-24">
        {children}
      </div>
      <Footer />
    </>
  )

}

export default DefaultLayout;
