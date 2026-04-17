import { SCHOOL_INFO } from "@/lib/constants";

const routes = ["", "/about", "/academics", "/admission", "/gallery", "/notices", "/contact"];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SCHOOL_INFO.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
