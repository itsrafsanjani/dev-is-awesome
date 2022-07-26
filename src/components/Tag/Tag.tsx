import { ITag } from "@/types/tag";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { FC } from "react";

export type TagProps = {
  tag: ITag;
  isActive?: boolean;
};

const TagItem: FC<TagProps> = ({ tag, isActive }) => {
  return (
    <Link href={`/tags/${tag.id}`}>
      <a
        className={classNames("px-3 py-2 rounded-md font-bold font-mono", {
          "bg-primary-500 text-gray-50": isActive,
          "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600":
            !isActive,
          "hover:brightness-90": !!tag.bgColor,
        })}
        style={{
          backgroundColor: tag.bgColor || undefined,
          color: tag.fgColor || undefined,
        }}
      >
        #{tag.id}
      </a>
    </Link>
  );
};

export default TagItem;
