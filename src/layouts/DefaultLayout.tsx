import { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default DefaultLayout;
