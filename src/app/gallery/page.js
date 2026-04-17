"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { galleryImages, galleryCategories } from "@/data/gallery";

// Metadata needs to be in a separate file for client components
// For now, we'll keep this as a client component for interactivity

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter images by category
  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const hasImages = galleryImages.length > 0;

  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Gallery"
            title="Capturing moments of learning, growth, and achievement."
            description="Browse through our collection of photos showcasing campus life, events, facilities, and student achievements."
          />
        </Reveal>

        {/* Category Filter - Only show if images exist */}
        {hasImages && (
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {galleryCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-[var(--color-accent)] text-white"
                      : "bg-gray-100 text-[var(--color-muted)] hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {/* Images Grid or Placeholder */}
        <div className="mt-12">
          {hasImages ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.src}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <p className="text-xs uppercase tracking-wider text-white/70 mb-1">
                          {image.category}
                        </p>
                        <p className="text-white font-semibold text-sm sm:text-base">
                          {image.caption || image.alt}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Placeholder when no images are uploaded */
            <Reveal delay={0.1}>
              <div className="text-center py-20 sm:py-32 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-dashed border-gray-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--color-accent-soft)] flex items-center justify-center text-4xl">
                  🖼️
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-ink)] mb-3">
                  Gallery Coming Soon
                </h3>
                <p className="text-[var(--color-muted)] max-w-md mx-auto mb-8 px-4">
                  Images will appear here once uploaded. Add your photos to the{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    /public/images/gallery/
                  </code>{" "}
                  folder and update the gallery data file.
                </p>
                <div className="flex flex-wrap justify-center gap-3 px-4">
                  <div className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-[var(--color-muted)]">
                    📸 Campus Photos
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-[var(--color-muted)]">
                    🎉 Events
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-[var(--color-muted)]">
                    🏆 Achievements
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-[var(--color-muted)]">
                    🎨 Activities
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Upload Instructions */}
        {!hasImages && (
          <Reveal delay={0.2}>
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-[var(--color-ink)] mb-4 flex items-center gap-2">
                  <span>📋</span> How to Add Images
                </h4>
                <ol className="space-y-3 text-sm text-[var(--color-muted)]">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center font-semibold text-xs">
                      1
                    </span>
                    <span>
                      Create a folder at{" "}
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded">
                        public/images/gallery/
                      </code>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center font-semibold text-xs">
                      2
                    </span>
                    <span>Copy your images into this folder</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center font-semibold text-xs">
                      3
                    </span>
                    <span>
                      Update{" "}
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded">
                        src/data/gallery.js
                      </code>{" "}
                      with your image details
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-1">
                  {selectedImage.category}
                </p>
                <p className="text-white font-medium text-sm sm:text-base">
                  {selectedImage.caption || selectedImage.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
