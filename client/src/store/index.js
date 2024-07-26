import { proxy } from "valtio";

const state = proxy({
  intro: false,
  color: "#EFBD48",
  isLogoTextureFront: true,
  isLogoTextureBack: false,
  isBoxTextureFront: false,
  isBoxTextureBack: true,
  isSmallLogoTextureFront: false,
  logoDecalFront: "./assets/here.png",
  logoDecalBack: "./assets/here.png",
  boxDecalFront: "./assets/here.png",
  boxDecalBack: "./assets/here.png",
  smallLogoDecalFront: "./assets/here.png",
  size: "0",
  defaultSide: "back",
});

export default state;
