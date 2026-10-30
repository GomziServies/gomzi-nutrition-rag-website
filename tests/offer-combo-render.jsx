import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { ManagedBannerAd } from "../src/component/healthkart/HkBannerAds";

export function renderBanner(banner) {
  return renderToStaticMarkup(<MemoryRouter><ManagedBannerAd banner={banner} /></MemoryRouter>);
}
