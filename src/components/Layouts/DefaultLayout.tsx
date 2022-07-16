import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar/NavBar";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
