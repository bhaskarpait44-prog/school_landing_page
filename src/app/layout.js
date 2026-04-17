import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotificationModal from "@/components/ui/NotificationModal";
import ScrollToTop from "@/components/ui/ScrollToTop";
import {
  buildMetadata,
  organizationSchema,
  schoolSchema,
  websiteSchema,
} from "@/lib/seo";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata = buildMetadata();

const structuredData = [
  websiteSchema(),
  organizationSchema(),
  schoolSchema(),
];

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-[var(--color-surface)] text-[var(--color-ink)]">
        <div className="site-shell">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <NotificationModal />
        <ScrollToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
