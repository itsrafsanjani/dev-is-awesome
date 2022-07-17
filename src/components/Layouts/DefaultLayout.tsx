import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "../Footer/Footer";
import Newsletter from "../Newsletter/Newsletter";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Newsletter />
      <Footer />
    </>
  );
};

export default DefaultLayout;
