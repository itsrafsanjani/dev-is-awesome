import { ITag } from "@/types/tag";

export const tagList: ITag[] = [
  {
    id: "react",
    name: "React",
    bgColor: "#61DAFB",
    fgColor: "#142D34",
  },
  {
    id: "nextjs",
    name: "Next.js",
    bgColor: "#000000",
    fgColor: "#FFFFFF",
  },
  {
    id: "remix",
    name: "Remix",
    bgColor: "#FCDF72",
    fgColor: "#332D17",
  },
  {
    id: "react-native",
    name: "React Native",
    bgColor: "#61DAFB",
    fgColor: "#142D34",
  },
  {
    id: "flutter",
    name: "Flutter",
    bgColor: "#5AC0EB",
    fgColor: "#132932",
  },
  {
    id: "nestjs",
    name: "Nest.js",
    bgColor: "#E0234E",
    fgColor: "#ffffff",
  },
  {
    id: "typescript",
    name: "TypeScript",
    bgColor: "#2776C6",
    fgColor: "#FFFFFF",
  },
  {
    id: "javascript",
    name: "JavaScript",
    bgColor: "#F0DB4F",
    fgColor: "#332F11",
  },
  {
    id: "rxjs",
    name: "RxJS",
    bgColor: "#D81C61",
    fgColor: "#ffffff",
  },
  {
    id: "firebase",
    name: "Firebase",
    bgColor: "#FACB2C",
    fgColor: "#332909",
  },
  {
    id: "git",
    name: "Git",
    bgColor: "#E94F31",
    fgColor: "#ffffff",
  },
].sort((i1, i2) => i1.name.localeCompare(i2.name));
