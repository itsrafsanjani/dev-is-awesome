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
  MdSearch,
} from "react-icons/md";
import { useColorScheme } from "@/contexts/ColorSchemeContext";
import { useSpotlight } from "@/contexts/SportlightContext";
import { MenuItem } from "@/types/menu-item";
import { navigationLinks } from "@/data/navigation-links";
import { SITE_INFO } from "@/constants/site";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { toggleColorScheme, colorScheme } = useColorScheme();
  const { openSpotlight } = useSpotlight();
  const router = useRouter();

  const menuItems = useMemo((): MenuItem[] => {
    const route = router.asPath.split("/")[1];
    return navigationLinks.map<MenuItem>((item) => ({
      ...item,
      isActive: route === item.href.split("/")[1],
    }));
  }, [router]);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", showSidebar);
  }, [showSidebar]);

  return (
    <>
      {/* NavBar */}
      <nav className="h-14 w-full border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 items-center flex px-4 lg:px-8 xl:px-12 gap-6 sticky top-0 left-0 right-0 z-30">
        <div className="flex-1 justify-start gap-4 flex items-center overflow-hidden">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setShowSidebar(true)}
            className="w-10 h-10 rounded-md hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center md:hidden"
          >
            <MdMenu className="text-2xl" />
          </button>

          {/* Navbar Logo */}
          <Link href={`/`}>
            <a className="text-lg font-bold uppercase truncate">
              {SITE_INFO.title}
            </a>
          </Link>
        </div>

        {/* Navbar Menu */}
        <ul className="items-center justify-end gap-4 hidden md:flex">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <a
                  className={classNames("", {
                    "text-primary-500 dark:text-primary-400 py-3":
                      item.isActive,
                    "hover:text-gray-600 dark:hover:text-gray-300":
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
        <div className="flex justify-end gap-2">
          {/* Color Schmee Toggle Button */}
          {[
            {
              icon: <MdSearch className="text-2xl" />,
              onClick: openSpotlight,
            },
            {
              icon:
                colorScheme === "system" ? (
                  <MdComputer className="text-2xl" />
                ) : colorScheme === "light" ? (
                  <MdLightMode className="text-2xl" />
                ) : (
                  <MdDarkMode className="text-2xl" />
                ),
              onClick: toggleColorScheme,
            },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 flex items-center justify-center"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </nav>

      {/* SideBar */}
      {showSidebar && (
        <div className="fixed inset-0 z-30">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gray-300/50 dark:bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setShowSidebar(false)}
          />
          {/* Drawer */}
          <div className="absolute top-0 bottom-0 left-0 w-80 max-w-[100%] bg-white dark:bg-gray-800 z-10">
            <div className="h-14 border-b bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 items-center flex px-4 gap-2">
              <Link href={`/`}>
                <a
                  className="text-lg font-bold uppercase flex-1 truncate"
                  onClick={() => setShowSidebar(false)}
                >
                  {SITE_INFO.title}
                </a>
              </Link>

              <button
                onClick={() => setShowSidebar(false)}
                className="w-10 h-10 rounded-md hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600 flex items-center justify-center"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            <ul className="flex flex-col p-3">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <a
                      className={classNames(
                        "px-3 py-2 flex w-full items-center rounded-md gap-3",
                        {
                          "bg-primary-500 text-gray-50": item.isActive,
                          "hover:text-gray-600 dark:hover:text-gray-300":
                            !item.isActive,
                        }
                      )}
                      onClick={() => setShowSidebar(false)}
                    >
                      <p className="flex-1 line-clamp-1">{item.label}</p>
                      <MdChevronRight className="text-2xl" />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
