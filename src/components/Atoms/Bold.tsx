import classNames from "classnames";
import React, { forwardRef } from "react";

export type BoldProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const Bold = forwardRef<HTMLElement, BoldProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <b
      className={classNames(
        "text-gray-900 dark:text-gray-50 font-bold",
        className
      )}
      {...rest}
      ref={ref}
    />
  );
});

Bold.displayName = "Bold";

export default Bold;
