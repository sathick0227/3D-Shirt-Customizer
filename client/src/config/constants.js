import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
    title: "Choose a product color",
  },
  {
    name: "filepicker",
    icon: fileIcon,
    title: "Add your design",
  },
  {
    name: "textedit",
    icon: ai,
    title: "Write what you want",
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  A4F: {
    stateProperty: "logoDecalFront",
    filterTab: "logoDecalFront",
  },
  A4B: {
    stateProperty: "logoDecalBack",
    filterTab: "logoDecalBack",
  },
  BOXF: {
    stateProperty: "boxDecalFront",
    filterTab: "boxDecalFront",
  },
  BOXB: {
    stateProperty: "boxDecalBack",
    filterTab: "boxDecalBack",
  },
  CHEST: {
    stateProperty: "smallLogoDecalFront",
    filterTab: "smallLogoDecalFront",
  },
};

export const serverUrl = import.meta.env.VITE_SERVER_URL;
