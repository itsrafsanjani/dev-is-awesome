import React, { FC } from "react";
import Container from "../Container";

export type PageHeaderPros = {
  title: string;
  desc?: string;
};

const PageHeader: FC<PageHeaderPros> = ({ title, desc }) => {
  return (
    <header className="py-16 bg-gray-100 dark:bg-gray-800">
      <Container>
        <h1 className="text-4xl font-black text-center">{title}</h1>
        {!!desc && (
          <p className="text-center text-gray-600 dark:text-gray-300 mt-4 text-lg">
            {desc}
          </p>
        )}
      </Container>
    </header>
  );
};

export default PageHeader;
