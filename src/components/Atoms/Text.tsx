import classNames from "classnames";
import React, { forwardRef } from "react";

export type TextProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

const Text = forwardRef<HTMLParagraphElement, TextProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <p
      className={classNames("text-gray-600 dark:text-gray-300", className)}
      {...rest}
      ref={ref}
    />
  );
});

Text.displayName = "Text";
export default Text;
