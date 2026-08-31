import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | StructroTech",
  description: "How StructroTech collects, uses, and protects your personal information.",
};

const lastUpdated = "May 24, 2026";

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          StructroTech (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a personal project and learning platform. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our site, subscribe to our newsletter, or
          use our services.
        </p>
        <p>
          By using StructroTech, you agree to the practices described in this policy. If you do
          not agree, please discontinue use of our services.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>We may collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Account information:</strong> name, email address, and credentials you
            provide when registering or signing in.
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, content viewed, search queries, device
            type, browser, IP address, and approximate location derived from IP.
          </li>
          <li>
            <strong>Communications:</strong> messages you send us, newsletter preferences, and
            support requests.
          </li>
          <li>
            <strong>Cookies and similar technologies:</strong> identifiers used for analytics,
            preferences, and security (see Cookies below).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use collected information to:</p>
        <ul>
          <li>Deliver, maintain, and improve our educational content and platform.</li>
          <li>Personalize learning paths and recommend relevant articles or resources.</li>
          <li>Send newsletters, product updates, and administrative notices (with your consent where required).</li>
          <li>Monitor usage, diagnose technical issues, and protect against fraud or abuse.</li>
          <li>Comply with legal obligations and enforce our Terms of Service.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Sharing and Disclosure",
    content: (
      <>
        <p>We do not sell your personal information. We may share data only in these circumstances:</p>
        <ul>
          <li>
            <strong>Service providers:</strong> trusted vendors who assist with hosting, analytics,
            email delivery, or authentication, under contractual confidentiality obligations.
          </li>
          <li>
            <strong>Legal requirements:</strong> when required by law, court order, or to protect
            rights, safety, and security of users or the public.
          </li>
          <li>
            <strong>Business transfers:</strong> in connection with a merger, acquisition, or sale
            of assets, with notice where practicable.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    content: (
      <>
        <p>
          We use cookies and similar technologies to remember preferences, measure traffic, and
          improve site performance. You can control cookies through your browser settings; disabling
          certain cookies may limit functionality.
        </p>
        <p>
          Where applicable, we honor browser &quot;Do Not Track&quot; signals only to the extent required
          by law in your jurisdiction.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    content: (
      <p>
        We retain personal information only as long as necessary for the purposes described in
        this policy, unless a longer retention period is required by law. When data is no longer
        needed, we delete or anonymize it using commercially reasonable methods.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We implement administrative, technical, and organizational measures designed to protect
        your information. No method of transmission over the Internet is completely secure; we
        cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    content: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access, correct, or delete personal information we hold about you.</li>
          <li>Object to or restrict certain processing activities.</li>
          <li>Withdraw consent for marketing communications at any time via unsubscribe links.</li>
          <li>Request a portable copy of your data where legally required.</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a href="mailto:contactstructrotech@gmail.com">contactstructrotech@gmail.com</a>. We will respond
          within the timeframe required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's Privacy",
    content: (
      <p>
        StructroTech is not directed to children under 13 (or the minimum age in your region). We do
        not knowingly collect personal information from children. If you believe a child has provided
        us data, contact us and we will delete it promptly.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top
        reflects the current version. Material changes will be posted on this page; continued use
        after changes constitutes acceptance where permitted by law.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Learn how StructroTech handles your data with transparency and care."
      lastUpdated={lastUpdated}
      sections={sections}
    />
  );
}
