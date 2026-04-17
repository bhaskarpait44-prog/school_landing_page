import { SCHOOL_INFO } from "@/lib/constants";

export function absoluteUrl(path = "") {
  const base = SCHOOL_INFO.url.replace(/\/$/, "");
  return path ? `${base}${path.startsWith("/") ? path : `/${path}`}` : base;
}

export function buildMetadata({
  title = SCHOOL_INFO.name,
  description = SCHOOL_INFO.description,
  path = "/",
  keywords = [],
} = {}) {
  const fullTitle =
    title === SCHOOL_INFO.name ? title : `${title} | ${SCHOOL_INFO.name}`;

  return {
    metadataBase: new URL(SCHOOL_INFO.url),
    title: fullTitle,
    description,
    keywords: [
      "school website",
      "best school admission",
      "modern school campus",
      "academic excellence",
      ...keywords,
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: SCHOOL_INFO.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    category: "education",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SCHOOL_INFO.name,
    url: SCHOOL_INFO.url,
    description: SCHOOL_INFO.description,
    inLanguage: "en-IN",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SCHOOL_INFO.name,
    url: SCHOOL_INFO.url,
    email: SCHOOL_INFO.email,
    telephone: SCHOOL_INFO.phone,
    sameAs: SCHOOL_INFO.socialLinks,
  };
}

export function schoolSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: SCHOOL_INFO.name,
    description: SCHOOL_INFO.description,
    url: SCHOOL_INFO.url,
    telephone: SCHOOL_INFO.phone,
    email: SCHOOL_INFO.email,
    address: {
      "@type": "PostalAddress",
      ...SCHOOL_INFO.address,
    },
  };
}
