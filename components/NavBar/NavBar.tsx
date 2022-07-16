import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import {
  MdChevronRight,
  MdClose,
  MdComputer,
  MdDarkMode,
  MdLightMode,
  MdMenu,
} from "react-icons/md";
import { useColorScheme } from "../../contexts/ColorScheme";

type MenuItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

const TITLE = "DEV IS AWESOME";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { toggleColorScheme, colorScheme } = useColorScheme();
  const router = useRouter();

  const menuItems = useMemo((): MenuItem[] => {
    const route = router.asPath.split("/")[1];
    return [
      {
        label: "Tutorials",
        href: "/tutorials",
        isActive: route === "tutorials",
      },
      {
        label: "Courses",
        href: "/courses",
        isActive: route === "courses",
      },
      {
        label: "Tags",
        href: "/tags",
        isActive: route === "tags",
      },
      {
        label: "Newsletter",
        href: "/newsletter",
        isActive: route === "newsletter",
      },
    ];
  }, [router]);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", showSidebar);
  }, [showSidebar]);

  return (
    <>
      {/* NavBar */}
      <nav className="h-14 w-full border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 items-center flex px-4 lg:px-8 xl:px-12 gap-6">
        <div className="flex-1 justify-start gap-4 flex items-center">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setShowSidebar(true)}
            className="w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center md:hidden"
          >
            <MdMenu className="text-2xl" />
          </button>

          {/* Navbar Logo */}
          <Link href={`/`}>
            <a className="text-lg font-bold uppercase">{TITLE}</a>
          </Link>
        </div>

        {/* Navbar Menu */}
        <ul className="items-center justify-end gap-4 hidden md:flex">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <a
                  className={classNames("font-medium", {
                    "": item.isActive,
                    "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50":
                      !item.isActive,
                  })}
                >
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        {/* Navbar Actions */}
        <div className="flex justify-end gap-4">
          {/* Color Schmee Toggle Button */}
          <button
            onClick={toggleColorScheme}
            className="w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
          >
            {colorScheme === "system" ? (
              <MdComputer className="text-2xl" />
            ) : colorScheme === "light" ? (
              <MdLightMode className="text-2xl" />
            ) : (
              <MdDarkMode className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {/* SideBar */}
      <div
        className={classNames("fixed inset-0 z-50", {
          "pointer-events-none": !showSidebar,
        })}
      >
        {/* Overlay */}
        <div
          className={classNames("absolute inset-0", {
            "backdrop-blur-md bg-black/50": showSidebar,
            "backdrop-blur-none bg-black/0": !showSidebar,
          })}
          style={{
            transitionProperty: "backdrop-filter, background-color",
            transitionDuration: "150ms",
            transitionTimingFunction: "ease-in-out",
          }}
          onClick={() => setShowSidebar(false)}
        />
        {/* Drawer */}
        <div
          className={classNames(
            "absolute top-0 bottom-0 w-80 max-w-[100%] bg-white dark:bg-gray-900 z-10",
            {
              "left-0": showSidebar,
              "-left-80": !showSidebar,
            }
          )}
          style={{
            transitionProperty: "left",
            transitionDuration: "150ms",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <div className="h-14 border-b bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 items-center flex px-4">
            <Link href={`/`}>
              <a
                className="text-lg font-bold uppercase w-full flex-1"
                onClick={() => setShowSidebar(false)}
              >
                {TITLE}
              </a>
            </Link>

            <button
              onClick={() => setShowSidebar(false)}
              className="w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>

          <ul className="flex flex-col p-4 gap-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a
                    className={classNames(
                      "px-4 flex w-full py-3 items-center rounded-md",
                      {
                        "bg-gray-100 dark:bg-gray-800": item.isActive,
                        "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800":
                          !item.isActive,
                      }
                    )}
                    onClick={() => setShowSidebar(false)}
                  >
                    <p className="flex-1 font-medium">{item.label}</p>
                    <MdChevronRight className="text-2xl text-gray-600 dark:text-gray-400" />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
