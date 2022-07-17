import classNames from "classnames";
import React, { FC } from "react";
import Container from "../Container";

export type PageHeaderPros = {
  title: string;
  desc?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

const PageHeader: FC<PageHeaderPros> = ({
  title,
  desc,
  children,
  className,
  ...rest
}) => {
  return (
    <header
      className={classNames("py-16 bg-gray-100 dark:bg-gray-800", className)}
      {...rest}
    >
      <Container>
        <h1 className="text-4xl font-black text-center">{title}</h1>
        {!!desc && <p className="text-center mt-4 text-lg">{desc}</p>}
        {children}
      </Container>
    </header>
  );
};

export default PageHeader;
