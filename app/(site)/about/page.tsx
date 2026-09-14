"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Users,
  Shield,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import {
  pageContainer,
  pageShell,
  pageHeaderBlock,
  pageTitle,
  pageSubtitle,
} from "@/lib/layout";
import { fadeUpInViewProps, fadeUpMountProps, listStaggerDelay } from "@/lib/motion";

const values = [
  {
    icon: Lightbulb,
    title: "Simplified Learning",
    description: "We break down complex topics into digestible, easy-to-understand content.",
  },
  {
    icon: Target,
    title: "Structured Approach",
    description: "Our content follows a logical progression to help you build knowledge effectively.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "We listen to our learners and create content based on real-world needs.",
  },
  {
    icon: Heart,
    title: "Passion for Teaching",
    description: "Our team is passionate about sharing knowledge and helping others grow.",
  },
  {
    icon: Shield,
    title: "Quality Content",
    description: "Every article is carefully researched and reviewed for accuracy.",
  },
  {
    icon: Eye,
    title: "Practical Focus",
    description: "We emphasize hands-on learning with real-world examples and projects.",
  },
];

type ContactChannel = {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  soon?: boolean;
};

const contactChannels: ContactChannel[] = [
  {
    icon: Mail,
    label: "Email",
    value: "contactstructrotech@gmail.com",
    href: "mailto:contactstructrotech@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@structrotech",
    href: "https://www.instagram.com/structrotech/",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    value: "Coming soon",
    soon: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Coming soon",
    soon: true,
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "Coming soon",
    soon: true,
  },
];

export default function AboutPage() {
  return (
    <div className={pageShell}>
      <div className={pageContainer}>
        <motion.section {...fadeUpMountProps(0)} className={`${pageHeaderBlock} md:mb-16`}>
          <h1 className={pageTitle}>About StructroLearn</h1>
          <p className={pageSubtitle}>
            We believe that quality tech education should be accessible to everyone. Our
            mission is to provide clear, structured, and practical learning resources for
            aspiring developers and IT professionals.
          </p>
        </motion.section>

        <motion.section {...fadeUpInViewProps(0)} className="mb-16">
          <div className="mx-auto max-w-3xl p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm text-center">
            <div className="flex flex-col items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary/10">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To become the go-to platform for structured technology education, empowering
              millions of learners worldwide to master AI, Cybersecurity, Linux, Cloud
              Computing, and more. We envision a world where anyone, regardless of
              background, can acquire the skills needed to thrive in the tech industry.
            </p>
          </div>
        </motion.section>

        <motion.section {...fadeUpInViewProps(0)} className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                {...fadeUpInViewProps(listStaggerDelay(index))}
                className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors text-center"
              >
                <div className="p-2 rounded-xl bg-primary/10 w-fit mb-4 mx-auto">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...fadeUpInViewProps(0)}
          id="contact"
          className="mb-16 scroll-mt-32 md:scroll-mt-36"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Contact Us</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Have a question, suggestion, or partnership idea? Reach out — we&apos;d love to hear
            from you. More channels are on the way.
          </p>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {contactChannels.map((channel, index) => {
              const inner = (
                <>
                  <div className="p-2 rounded-xl bg-primary/10 shrink-0">
                    <channel.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{channel.label}</p>
                    <p className="text-sm text-muted-foreground truncate">{channel.value}</p>
                  </div>
                  {channel.soon && (
                    <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      Later
                    </span>
                  )}
                </>
              );

              const baseClass =
                "flex items-center gap-3 p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm";

              if (channel.href) {
                const external = channel.href.startsWith("http");
                return (
                  <motion.a
                    key={channel.label}
                    {...fadeUpInViewProps(listStaggerDelay(index))}
                    href={channel.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`${baseClass} transition-colors hover:border-primary/50`}
                  >
                    {inner}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={channel.label}
                  {...fadeUpInViewProps(listStaggerDelay(index))}
                  className={`${baseClass} opacity-70`}
                >
                  {inner}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section {...fadeUpInViewProps(0)} className="pb-4">
          <div className="mx-auto max-w-3xl p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm text-center transition-colors hover:border-primary/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Explore our categories and begin your journey to mastering technology.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              Start Learning
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
