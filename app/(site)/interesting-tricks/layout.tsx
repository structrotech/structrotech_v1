import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Interesting Tricks",
  description:
    "Practical tech tricks and how-tos for mobile, PC, productivity, and security — each with a full blog guide.",
  path: "/interesting-tricks",
});

export default function InterestingTricksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
