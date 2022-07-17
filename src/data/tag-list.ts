import { ITag } from "@/types/tag";

export const tagList: ITag[] = [
  {
    id: "react",
    name: "React",
  },
  {
    id: "nextjs",
    name: "Next.js",
  },
  {
    id: "remix",
    name: "Remix",
  },
  {
    id: "react-native",
    name: "React Native",
  },
  {
    id: "flutter",
    name: "Flutter",
  },
  {
    id: "nestjs",
    name: "Nest.js",
  },
].sort((i1, i2) => i1.name.localeCompare(i2.name));
