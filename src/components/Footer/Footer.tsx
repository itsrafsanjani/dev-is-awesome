import { MenuItem } from "@/types/menu-item";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import Container from "../Container";

const Footer = () => {
  const footerLinks = useMemo(
    (): MenuItem[] => [
      {
        label: "Contact",
        href: "/contact",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/rohid_dev",
        isExternal: true,
      },
      {
        label: "Github",
        href: "https://github.com/rohid-dev",
        isExternal: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/md-rohidul-islam-04a655229",
        isExternal: true,
      },
      {
        label: "Privacy",
        href: "/privacy",
      },
      {
        label: "Terms",
        href: "/terms",
      },
    ],
    []
  );
  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <Container>
        <div className="py-16 text-center">
          <Link href={`/`}>
            <a className="text-xl font-bold uppercase">Dev Is Awesome</a>
          </Link>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Copyright © 2022 Dev Is Awesome
          </p>

          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Created with{" "}
            <Link href={"https://nextjs.org"}>
              <a
                target="_blank"
                className="font-medium text-gray-900 dark:text-gray-50"
              >
                Next.js{" "}
              </a>
            </Link>
            by{" "}
            <Link href={"https://rohid.dev"}>
              <a
                target="_blank"
                className="font-medium text-gray-900 dark:text-gray-50"
              >
                Rohidul Islam
              </a>
            </Link>
          </p>
        </div>
        <div className="py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  target={item.isExternal ? "_blank" : undefined}
                  className="hover:text-gray-500 dark:hover:text-gray-400"
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
