import classNames from "classnames";
import React, { forwardRef } from "react";

export type ContainerProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ref: _, ...rest }, ref) => (
    <div
      className={classNames("mx-auto w-full max-w-6xl px-4", className)}
      {...rest}
      ref={ref}
    />
  )
);

Container.displayName = "Container";

export default Container;
