import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Marquee from "@/components/Marquee";
import Philosophy from "@/components/Philosophy";
import Lifestyle from "@/components/Lifestyle";
import FeaturedTrio from "@/components/FeaturedTrio";
import SeriesIndex from "@/components/SeriesIndex";
import ProcessTimeline from "@/components/ProcessTimeline";
import Investment from "@/components/Investment";
import ReserveCta from "@/components/ReserveCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Showcase />
      <Marquee />
      <Philosophy />
      <Lifestyle />
      <FeaturedTrio />
      <SeriesIndex />
      <ProcessTimeline />
      <Investment />
      <ReserveCta />
    </>
  );
}
