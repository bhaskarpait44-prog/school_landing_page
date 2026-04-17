export const SCHOOL_INFO = {
  name: "ABC School",
  shortName: "ABC",
  description:
    "ABC School delivers future-ready academics, vibrant co-curricular programs, and a caring campus culture for confident learners.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  email: "admissions@abcschool.edu",
  phone: "+91 98765 43210",
  address: {
    streetAddress: "12 Knowledge Avenue",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "700001",
    addressCountry: "IN",
  },
  socialLinks: [
    "https://www.facebook.com/",
    "https://www.instagram.com/",
    "https://www.youtube.com/",
  ],
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/academics", label: "Academics" },
    { href: "/admission", label: "Admission" },
    { href: "/gallery", label: "Gallery" },
    { href: "/notices", label: "Notices" },
    { href: "/contact", label: "Contact" },
  ],
};
