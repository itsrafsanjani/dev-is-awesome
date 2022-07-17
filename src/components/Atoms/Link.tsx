import React, { forwardRef } from "react";
import NextLink from "next/link";
import classNames from "classnames";

export type LinkProps = {
  href: string;
} & Omit<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  "href"
>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { href, className, ...rest } = props;
  return (
    <NextLink href={href}>
      <a
        className={classNames(
          "font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 underline underline-offset-1",
          className
        )}
        {...rest}
        ref={ref}
      />
    </NextLink>
  );
});

Link.displayName = "Link";

export default Link;
