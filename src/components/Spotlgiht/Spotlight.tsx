import { useColorScheme } from "@/contexts/ColorSchemeContext";
import { useSpotlight } from "@/contexts/SportlightContext";
import { navigationLinks } from "@/data/navigation-links";
import { tagList } from "@/data/tag-list";
import { MenuItem } from "@/types/menu-item";
import { SearchCategory, SearchResult } from "@/types/spotlight-types";
import classNames from "classnames";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { MdChevronRight, MdClose, MdOpenInNew, MdSearch } from "react-icons/md";

const NAVIGATION_CATEGORY = "navigation-links";
const BLOGS_CATEGORY = "blogs";
const TAGS_CATEGORY = "tags";
const TUTORIALS_CATEGORY = "tutorials";
const COURSES_CATEGORY = "courses";
const ACTIONS_CATEGORY = "actions";

const searchCategories = new Map<string, SearchCategory>([
  [NAVIGATION_CATEGORY, { name: "Navigation" }],
  [BLOGS_CATEGORY, { name: "Blog" }],
  [TUTORIALS_CATEGORY, { name: "Tutorial" }],
  [COURSES_CATEGORY, { name: "Course" }],
  [ACTIONS_CATEGORY, { name: "Actions" }],
  [TAGS_CATEGORY, { name: "Tags" }],
]);

const links: MenuItem[] = [
  ...navigationLinks,
  {
    href: "/",
    label: "Home",
  },
];

const navigationSearches: SearchResult[] = links.map<SearchResult>((item) => ({
  type: "link",
  title: item.label,
  desc: `Path '${item.href}'`,
  category: searchCategories.get(NAVIGATION_CATEGORY)!,
  href: item.href,
  id: item.href.split("/")[1],
  keywords: ["links"],
}));

const tagSearches: SearchResult[] = tagList.map<SearchResult>((item) => ({
  type: "link",
  title: `#${item.name}`,
  id: item.id,
  category: searchCategories.get(TAGS_CATEGORY)!,
  href: `/tags/${item.id}`,
  desc: `Path '/tags/${item.id}'`,
  keywords: ["tags", "tag", item.name, item.id],
}));

const predefinedSearchResults = [...navigationSearches, ...tagSearches];

const Spotlight = () => {
  const { closeSpotlight } = useSpotlight();
  const [searchText, setSearchText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toggleColorScheme, setColorScheme, colorScheme } = useColorScheme();

  const actionResults = useMemo(
    (): SearchResult[] => [
      {
        id: "actions-toggle-appearance",
        title: "Toggle Appearance",
        desc: `Current Appearance is '${colorScheme}'`,
        type: "button",
        onClick: toggleColorScheme,
        category: searchCategories.get(ACTIONS_CATEGORY)!,
        keywords: [
          "dark",
          "light",
          "system",
          "auto",
          "mode",
          "theme",
          "colorscheme",
          "scheme",
        ],
      },
      {
        id: "actions-toggle-appearance",
        title: "Enable Dark Theme",
        desc: colorScheme === "dark" ? "Current" : undefined,
        type: "button",
        onClick: () => setColorScheme("dark"),
        category: searchCategories.get(ACTIONS_CATEGORY)!,
        keywords: ["colorscheme", "theme", "mode"],
      },
      {
        id: "actions-toggle-appearance",
        title: "Enable Light Theme",
        desc: colorScheme === "light" ? "Current" : undefined,
        type: "button",
        onClick: () => setColorScheme("light"),
        category: searchCategories.get(ACTIONS_CATEGORY)!,
        keywords: ["colorscheme", "theme", "mode"],
      },
      {
        id: "actions-toggle-appearance",
        title: "Enable System Theme",
        desc: colorScheme === "system" ? "Current" : undefined,
        type: "button",
        onClick: () => setColorScheme("system"),
        category: searchCategories.get(ACTIONS_CATEGORY)!,
        keywords: ["colorscheme", "auto", "theme", "mode"],
      },
    ],
    [toggleColorScheme, colorScheme, setColorScheme]
  );

  const searchResultsWithSections = useMemo(() => {
    const categories = new Set<SearchCategory>();
    searchResults.forEach((item) => {
      if (!!item.category) {
        categories.add(item.category);
      }
    });
    const results = new Map<SearchCategory, SearchResult[]>();
    categories.forEach((category) => {
      results.set(
        category,
        searchResults.filter((item) => item.category === category)
      );
    });
    return results;
  }, [searchResults]);

  const scrollToSelectedItem = useCallback(
    (index: number) => {
      const offest = 16;
      if (scrollRef.current) {
        const item = document.getElementById(`search-item-${index}`);
        if (!item) return;
        const topPoint = scrollRef.current.offsetTop;
        const bottomPoint =
          scrollRef.current.offsetTop + scrollRef.current.offsetHeight;
        if (
          bottomPoint <
          item.offsetTop - scrollRef.current.scrollTop + item.offsetHeight
        ) {
          const top =
            item.offsetTop -
            scrollRef.current.offsetTop -
            scrollRef.current.offsetHeight +
            item.offsetHeight +
            offest;
          scrollRef.current.scrollTo({
            top,
          });
        } else if (topPoint > item.offsetTop - scrollRef.current.scrollTop) {
          const top = item.offsetTop - scrollRef.current.offsetTop - offest;
          scrollRef.current.scrollTo({
            top,
          });
        }
      }
    },
    [scrollRef]
  );

  const onArrowDown = useCallback(() => {
    let newIndex = selectedIndex + 1;
    if (newIndex >= searchResults.length) {
      newIndex = 0;
    }
    setSelectedIndex(newIndex);
    scrollToSelectedItem(newIndex);
  }, [searchResults, selectedIndex, scrollToSelectedItem]);

  const onArrowUp = useCallback(() => {
    let newIndex = selectedIndex - 1;
    if (newIndex < 0) {
      newIndex = searchResults.length - 1;
    }
    setSelectedIndex(newIndex);
    scrollToSelectedItem(newIndex);
  }, [selectedIndex, searchResults, scrollToSelectedItem]);

  const onEnter = useCallback(() => {
    const item = document.getElementById(`search-item-${selectedIndex}`);
    if (!item) return;
    const child = item.children[0] as HTMLElement;
    if (child) child.click();
    closeSpotlight();
  }, [selectedIndex, closeSpotlight]);

  const onKeyPress = useCallback(
    (ev: KeyboardEvent) => {
      switch (ev.code) {
        case "Escape":
          ev.preventDefault();
          closeSpotlight();
          break;
        case "ArrowDown":
          ev.preventDefault();
          onArrowDown();
          break;
        case "ArrowUp":
          ev.preventDefault();
          onArrowUp();
          break;
        case "Enter":
          ev.preventDefault();
          onEnter();
          break;
        default:
          break;
      }
    },
    [closeSpotlight, onArrowDown, onArrowUp, onEnter]
  );

  const handleSearch = useCallback(
    (text: string) => {
      const searchKeys = text.toLocaleLowerCase().split(" ").filter(Boolean);
      const allResults = [...predefinedSearchResults, ...actionResults];

      let finalResults = allResults
        .map((item) => {
          let isDirectMatch = false;
          let matches = 0;
          const titleKeys = item.title
            .toLocaleLowerCase()
            .replaceAll(`"`, "")
            .replaceAll(`'`, "")
            .replaceAll("`", "")
            .split(" ");
          const descKeys =
            item.desc
              ?.toLocaleLowerCase()
              .replaceAll(`"`, "")
              .replaceAll(`'`, "")
              .replaceAll("`", "")
              .split(" ") || [];
          const categoryKeys =
            item.category.name.toLocaleLowerCase().split(" ") || [];
          const keywords = item.keywords || [];
          [...titleKeys, ...descKeys, ...categoryKeys, ...keywords]
            .filter(Boolean)
            .forEach((key) => {
              searchKeys.forEach((skey) => {
                if (key.toLocaleLowerCase() === skey) {
                  isDirectMatch = true;
                }
                if (key.toLocaleLowerCase().startsWith(skey)) {
                  matches++;
                }
              });
            });

          return { isDirectMatch, matches, item };
        })
        .filter((item) => item.matches > 0)
        .sort((i1, i2) => i1.item.title.localeCompare(i2.item.title))
        .sort((i1, i2) =>
          i1.item.category.name.localeCompare(i2.item.category.name)
        )
        .sort((i1, i2) => i2.matches - i1.matches)
        .sort((i1, i2) => {
          if (i1.isDirectMatch && !i2.isDirectMatch) return -1;
          if (!i1.isDirectMatch && i2.isDirectMatch) return 1;
          return 0;
        })
        .map((item) => item.item);
      setSearchResults(finalResults);
    },
    [actionResults]
  );

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", true);
    return () => {
      document.documentElement.classList.toggle("overflow-hidden", false);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress]);

  useEffect(() => {
    if (searchText) {
      setSelectedIndex(0);
      handleSearch(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText, handleSearch]);

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-gray-300/50 dark:bg-gray-900/50 backdrop-blur-sm"
        onClick={closeSpotlight}
      />
      <div className="absolute z-10 pt-4 pb-48 md:py-24 px-4 inset-0 pointer-events-none overflow-hidden">
        <div className="w-full max-w-full md:max-w-2xl bg-white dark:bg-gray-800 mx-auto pointer-events-auto rounded-xl border-t border-gray-100 dark:border-gray-700 max-h-full overflow-hidden flex flex-col">
          <div className="w-full border-b border-gray-100 dark:border-gray-700 flex items-center px-4 relative">
            <MdSearch className="text-2xl text-gray-500 dark:text-gray-400 absolute left-4 pointer-events-none" />
            <input
              className="appearance-none md:text-lg pl-8 pr-4 py-4 w-full bg-transparent outline-none border-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              maxLength={80}
            />
            <button
              onClick={closeSpotlight}
              className="w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1" ref={scrollRef}>
            {searchResults.length === 0 ? (
              <div className="p-8 text-center items-center justify-center flex flex-col gap-4 text-gray-500 dark:text-gray-400">
                <MdSearch className="text-7xl" />
                <span className="text-lg">
                  {!searchText ? (
                    <span>Search results will show up here.</span>
                  ) : (
                    <span>
                      No results for{" "}
                      <span className="font-medium text-gray-900 dark:text-gray-50">
                        &apos;{searchText}&apos;
                      </span>
                    </span>
                  )}
                </span>
              </div>
            ) : (
              <div className="px-4">
                {[...searchResultsWithSections].map((item) => {
                  const category = item[0];
                  const results = item[1];
                  return (
                    <section key={category.name} className="my-8">
                      <div className="flex items-center mb-4">
                        <h3>{category.name}</h3>
                      </div>
                      <ul role="listbox" className="flex flex-col gap-2">
                        {results.map((item) => {
                          const index = searchResults.indexOf(item);
                          const isSelected = selectedIndex === index;
                          return (
                            <li
                              role="option"
                              aria-selected={isSelected}
                              key={index}
                              id={`search-item-${index}`}
                              onMouseEnter={() => setSelectedIndex(index)}
                            >
                              {item.type === "link" ? (
                                <Link href={item.href}>
                                  <a
                                    tabIndex={-1}
                                    onFocus={() => setSelectedIndex(index)}
                                    target={
                                      item.isExternal ? "_blank" : undefined
                                    }
                                    onClick={closeSpotlight}
                                  >
                                    <SearchItemRow
                                      data={item}
                                      isSelected={isSelected}
                                    />
                                  </a>
                                </Link>
                              ) : item.type === "button" ? (
                                <button
                                  tabIndex={-1}
                                  className="w-full text-start"
                                  onFocus={() => setSelectedIndex(index)}
                                  onClick={() => {
                                    item.onClick();
                                    closeSpotlight();
                                  }}
                                >
                                  <SearchItemRow
                                    data={item}
                                    isSelected={isSelected}
                                  />
                                </button>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
          {/* <div className="h-12 border-t border-gray-100 dark:border-gray-700"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Spotlight;

const SearchItemRow = ({
  data,
  isSelected,
}: {
  data: SearchResult;
  isSelected?: boolean;
}) => (
  <div
    className={classNames(
      "px-4 py-2 rounded-md items-center flex w-full text-start gap-4",
      {
        "bg-primary-500 text-gray-50": isSelected,
        "bg-gray-100 dark:bg-gray-700": !isSelected,
      }
    )}
  >
    <div className="flex-1 flex flex-col items-start">
      <span className="line-clamp-1">{data.title}</span>
      {data.desc && (
        <span
          className={classNames("text-sm line-clamp-1", {
            "text-gray-500 dark:text-gray-400": !isSelected,
            "text-primary-200": isSelected,
          })}
        >
          {data.desc}
        </span>
      )}
    </div>
    {data.type === "link" && (
      <div
        className={classNames({
          "text-gray-500 dark:text-gray-400": !isSelected,
          "": isSelected,
        })}
      >
        {data.isExternal ? (
          <MdOpenInNew className="text-2xl" />
        ) : (
          <MdChevronRight className="text-2xl" />
        )}
      </div>
    )}
  </div>
);
