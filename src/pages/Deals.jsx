import SEO from "../component/SEO";
import HkStealDeals from "../component/healthkart/HkStealDeals";
import PageHeading from "../HOC/Header/PageHeading";

export default function Deals() {
  return <>
    <SEO title="Supplement Deals & Offers" description="Explore the latest supplement deals, prices and coupon offers at Gomzi Nutrition." />
    <PageHeading head="Deals & Offers" description="Explore the latest prices, coupon offers and supplement deals from Gomzi Nutrition." />
    <div className="min-h-[60vh]"><HkStealDeals showAll /></div>
  </>;
}
