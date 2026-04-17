import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import NoticeBoard from "@/components/sections/NoticeBoard";
import GalleryPreview from "@/components/sections/GalleryPreview";
import ContactCTA from "@/components/sections/ContactCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "Explore ABC School's premium learning environment, admissions guidance, academics, notices, and campus highlights.",
  path: "/",
  keywords: ["ABC School", "school home page", "school admission website"],
});

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <NoticeBoard />
      <GalleryPreview />
      <ContactCTA />
    </>
  );
}
