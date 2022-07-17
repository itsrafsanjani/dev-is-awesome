export type SearchCategory = {
  name: string;
};

export type SearchResultLink = {
  type: "link";
  href: string;
  isExternal?: boolean;
};

export type SearchResultButton = {
  type: "button";
  onClick: () => void;
};

export type SearchResult = {
  id: string;
  title: string;
  desc?: string;
  category: SearchCategory;
  keywords?: string[];
} & (SearchResultLink | SearchResultButton);
