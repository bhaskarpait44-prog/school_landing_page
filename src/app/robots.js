import { SCHOOL_INFO } from "@/lib/constants";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SCHOOL_INFO.url}/sitemap.xml`,
  };
}
