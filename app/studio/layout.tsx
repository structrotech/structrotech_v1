import type { Metadata, Viewport } from "next";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "StructroTech Studio",
  description: "Content management for StructroTech",
};

export const viewport: Viewport = {
  ...studioViewport,
  interactiveWidget: "resizes-content",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#101112]">
      {children}
    </div>
  );
}
