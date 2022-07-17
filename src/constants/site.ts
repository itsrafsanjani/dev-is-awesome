export const SITE_INFO: Info = {
  title: "Dev Is Awesome",
  deploymentType: "debug",
  slug: "devisawesome",
  domain: "devisawesome.com",
  url: "https://devisawesome.com",
  copyRight: "Copyright © 2022 Dev Is Awesome",
  builtWith: [
    {
      name: "Next.js",
      url: "https://nextjs.org",
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com",
    },
  ],
  builtBy: [
    {
      name: "Rohidul Islam",
      url: "https://rohid.dev",
    },
  ],
};

export type Info = {
  title: string;
  desc?: string;
  deploymentType: "debug" | "alpha" | "beta" | "production";
  slug: string;
  domain: string;
  url: string;
  copyRight: string;
  builtWith: {
    name: string;
    url: string;
  }[];
  builtBy: {
    name: string;
    url: string;
  }[];
};
