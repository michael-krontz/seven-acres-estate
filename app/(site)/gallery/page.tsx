import Image from "next/image";

export const metadata = {
  title: "Gallery | Seven Acres Estate",
};

const images = Array.from({ length: 12 }).map((_, i) => ({
  src: `/placeholder/hero-${(i % 3) + 1}.jpg`,
  alt: `Gallery image ${i + 1}`,
}));

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.alt} className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </main>
  );
}


