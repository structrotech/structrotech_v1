import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | StructroTech",
  description: "Terms and conditions governing your use of the StructroTech platform.",
};

const lastUpdated = "May 24, 2026";

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to Terms",
    content: (
      <>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of StructroTech,
          a personal project and brand, including its website, content, and related services (collectively, the &quot;Service&quot;). By accessing or
          using the Service, you agree to be bound by these Terms and our Privacy Policy.
        </p>
        <p>
          If you are using the Service on behalf of an organization, you represent that you have
          authority to bind that organization to these Terms.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <p>
        You must be at least 13 years old (or the minimum age required in your jurisdiction) to use
        the Service. Users under 18 should use StructroTech with parental or guardian supervision
        where required by local law.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts and Security",
    content: (
      <>
        <p>
          When you create an account, you agree to provide accurate information and keep your
          credentials confidential. You are responsible for all activity under your account.
          Notify us immediately at{" "}
          <a href="mailto:contactstructrotech@gmail.com">contactstructrotech@gmail.com</a> if you suspect
          unauthorized access.
        </p>
        <p>We may suspend or terminate accounts that violate these Terms or pose security risks.</p>
      </>
    ),
  },
  {
    id: "use-of-service",
    title: "Permitted Use",
    content: (
      <>
        <p>StructroTech grants you a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial learning, unless otherwise agreed in writing.</p>
        <p>You agree not to:</p>
        <ul>
          <li>Copy, scrape, or redistribute content without permission.</li>
          <li>Reverse engineer, interfere with, or disrupt the Service or its infrastructure.</li>
          <li>Upload malware, spam, or unlawful material.</li>
          <li>Impersonate others or misrepresent your affiliation with StructroTech.</li>
          <li>Use the Service in violation of applicable laws or third-party rights.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          All content on StructroTech—including text, graphics, logos, roadmaps, cheatsheets, and
          software—is owned by StructroTech or its licensors and protected by copyright and other
          intellectual property laws.
        </p>
        <p>
          You may share links to our content and quote brief excerpts with attribution. Commercial
          use, bulk reproduction, or derivative works require prior written consent.
        </p>
      </>
    ),
  },
  {
    id: "user-content",
    title: "User Content",
    content: (
      <>
        <p>
          If you submit comments, feedback, or other materials (&quot;User Content&quot;), you grant
          StructroTech a worldwide, royalty-free license to use, display, and improve the Service
          based on that content. You retain ownership of your User Content and represent that you
          have the right to submit it.
        </p>
        <p>We may remove User Content that violates these Terms or community standards.</p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Links and Tools",
    content: (
      <p>
        The Service may link to third-party websites, tools, or resources. StructroTech does not
        control and is not responsible for third-party content, privacy practices, or availability.
        Your use of third-party services is at your own risk.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <p>
        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT. Educational content is for informational purposes and does not constitute
        professional, legal, or employment advice. See our{" "}
        <a href="/disclaimer">Disclaimer</a> for additional details.
      </p>
    ),
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    content: (
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, STRUCTROTECH AND ITS AFFILIATES SHALL NOT BE LIABLE
        FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
        PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR
        ANY CLAIM SHALL NOT EXCEED THE GREATER OF (A) AMOUNTS YOU PAID US IN THE TWELVE MONTHS
        PRECEDING THE CLAIM OR (B) ONE HUNDRED U.S. DOLLARS ($100).
      </p>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <p>
        You agree to indemnify and hold harmless StructroTech, its officers, employees, and partners
        from claims, damages, and expenses (including reasonable attorneys&apos; fees) arising from your
        use of the Service, violation of these Terms, or infringement of third-party rights.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <p>
        You may stop using the Service at any time. We may suspend or terminate access with or
        without notice for conduct that we believe violates these Terms or harms other users or the
        platform. Provisions that by nature should survive termination will remain in effect.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law and Disputes",
    content: (
      <p>
        These Terms are governed by the laws of India and the State of Telangana,
        without regard to conflict-of-law principles. Disputes shall be resolved through good-faith
        negotiation first; if unresolved, they may be submitted to the exclusive jurisdiction of the
        courts located in Telangana, India.
      </p>
    ),
  },
  {
    id: "changes-terms",
    title: "Changes to Terms",
    content: (
      <p>
        We may modify these Terms at any time. We will post the updated version with a revised
        &quot;Last updated&quot; date. Your continued use after changes become effective constitutes
        acceptance of the revised Terms.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="The rules and guidelines for using StructroTech responsibly."
      lastUpdated={lastUpdated}
      sections={sections}
    />
  );
}
