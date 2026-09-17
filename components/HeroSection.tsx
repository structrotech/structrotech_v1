"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { pageContainer } from "@/lib/layout";
import {
  fadeUpMountProps,
} from "@/lib/motion";

export function HeroSection() {
  return (
    <section className="relative pt-44 pb-20 overflow-hidden w-full">
      <div
        className={`relative ${pageContainer} flex flex-col items-center justify-center text-center`}
      >
        <motion.div {...fadeUpMountProps(0)} className="w-full">
          <h1 className="font-serif w-full text-center text-[clamp(40px,5vw,72px)] font-semibold leading-[1.1] tracking-normal text-foreground mb-5">
            Welcome to{" "}
            <span className="text-primary">StructroLearn</span>
          </h1>
        </motion.div>

        <motion.p
          {...fadeUpMountProps(0.1)}
          className="w-full text-center text-[17px] md:text-[18px] font-light text-muted-foreground mb-8 max-w-[540px] mx-auto leading-relaxed"
        >
          We make evolving tech and complex tech concepts simple, structured, and organized.
        </motion.p>

        <motion.div
          {...fadeUpMountProps(0.3)}
          className="w-full flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/categories"
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px] flex items-center"
          >
            Explore Categories
          </Link>
          <Link
            href="/blogs"
            className="px-6 py-3 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors min-h-[44px] flex items-center"
          >
            Browse Blogs
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
