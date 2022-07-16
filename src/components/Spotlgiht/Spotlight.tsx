import { useSpotlight } from "@/contexts/SportlightContext";
import classNames from "classnames";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { MdChevronRight, MdClose, MdSearch, MdTag } from "react-icons/md";

const Spotlight = () => {
  const { closeSpotlight } = useSpotlight();
  const [searchText, setSearchText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [result, setResult] = useState(new Array(20).fill(1));
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToSelectedItem = useCallback(
    (index: number) => {
      const offest = 12;
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
    if (newIndex >= result.length) {
      newIndex = 0;
    }
    setSelectedIndex(newIndex);
    scrollToSelectedItem(newIndex);
  }, [result, selectedIndex, scrollToSelectedItem]);

  const onArrowUp = useCallback(() => {
    let newIndex = selectedIndex - 1;
    if (newIndex < 0) {
      newIndex = result.length - 1;
    }
    setSelectedIndex(newIndex);
    scrollToSelectedItem(newIndex);
  }, [selectedIndex, result, scrollToSelectedItem]);

  const onEnter = useCallback(() => {}, []);

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

  useLayoutEffect(() => {
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
              autoFocus
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              onClick={closeSpotlight}
              className="w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>
          <div className="p-3 overflow-y-auto flex-1" ref={scrollRef}>
            <ul role="listbox" className="flex flex-col gap-3">
              {result.map((_, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    role="option"
                    aria-selected={isSelected}
                    key={index}
                    id={`search-item-${index}`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <Link href={`#`}>
                      <a
                        className={classNames(
                          "p-3 rounded-lg items-center flex w-full text-start gap-3",
                          {
                            "bg-primary-500 text-gray-50": isSelected,
                            "bg-gray-100/50 dark:bg-gray-700/50": !isSelected,
                          }
                        )}
                      >
                        <div
                          className={classNames(
                            "p-1 rounded-md selected:bg-red-500",
                            {
                              "bg-white/20": isSelected,
                              "bg-gray-200 dark:bg-gray-600 opacity-50":
                                !isSelected,
                            }
                          )}
                        >
                          <MdTag className="text-xl" />
                        </div>
                        <div className="flex-1">
                          <span>
                            <span className="opacity-70">Search Result</span>
                            <span className="font-medium"> Matched Text</span>
                          </span>
                        </div>
                        <div className="opacity-50">
                          <MdChevronRight className="text-2xl" />
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
