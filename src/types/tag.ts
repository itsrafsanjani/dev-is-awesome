import { Color } from "./color";

export type ITag = {
  id: string;
  name: string;
  desc?: string;
  fgColor?: Color;
  bgColor?: Color;
};
