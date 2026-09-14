import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer | StructroLearn",
  description: "Important limitations regarding StructroLearn educational content and materials.",
};

const lastUpdated = "May 24, 2026";

const sections: LegalSection[] = [
  {
    id: "general",
    title: "General Disclaimer",
    content: (
      <>
        <p>
          The information provided on StructroLearn is for general educational and informational
          purposes only. While we strive for accuracy and clarity, we make no representations or
          warranties, express or implied, about the completeness, reliability, or suitability of
          any content on this site.
        </p>
        <p>
          Any reliance you place on StructroLearn materials is strictly at your own risk. You should
          verify critical information through official documentation, qualified professionals, or
          hands-on testing before applying it in production or professional environments.
        </p>
      </>
    ),
  },
  {
    id: "not-professional-advice",
    title: "Not Professional Advice",
    content: (
      <>
        <p>StructroLearn content does not constitute:</p>
        <ul>
          <li>Legal, financial, or investment advice</li>
          <li>Medical or health advice</li>
          <li>Formal career, employment, or certification guarantees</li>
          <li>Official vendor documentation for any technology product</li>
        </ul>
        <p>
          For decisions with legal, financial, or safety implications, consult licensed
          professionals or official sources appropriate to your situation.
        </p>
      </>
    ),
  },
  {
    id: "technical-accuracy",
    title: "Technical Accuracy and Updates",
    content: (
      <>
        <p>
          Technology evolves rapidly. Tutorials, roadmaps, cheatsheets, and blog posts may become
          outdated as tools, APIs, security practices, and best practices change. We update content
          when possible but cannot guarantee that every page reflects the latest version of a
          product or standard at all times.
        </p>
        <p>
          Always cross-reference with official documentation from vendors (e.g., cloud providers,
          operating system distributors, framework maintainers) before implementing changes in live
          systems.
        </p>
      </>
    ),
  },
  {
    id: "security-labs",
    title: "Security and Hands-On Labs",
    content: (
      <>
        <p>
          Cybersecurity, networking, and system administration content may describe techniques
          intended for authorized learning environments only. You must not use StructroLearn
          materials to access systems, networks, or data without explicit permission.
        </p>
        <p>
          Unauthorized testing or exploitation may violate law. You are solely responsible for
          ensuring your activities comply with applicable laws, organizational policies, and ethical
          standards.
        </p>
      </>
    ),
  },
  {
    id: "external-links",
    title: "External Links and Resources",
    content: (
      <p>
        Our site may reference third-party websites, repositories, downloads, or tools. StructroLearn
        does not endorse and is not responsible for the content, security, or privacy practices of
        external sites. Visiting or using third-party resources is at your own discretion and risk.
      </p>
    ),
  },
  {
    id: "no-guarantees",
    title: "No Guarantees of Outcomes",
    content: (
      <p>
        Completing tutorials, roadmaps, or courses on StructroLearn does not guarantee employment,
        certification exam success, project outcomes, or business results. Learning outcomes depend
        on individual effort, prior experience, and external factors beyond our control.
      </p>
    ),
  },
  {
    id: "errors",
    title: "Errors and Omissions",
    content: (
      <p>
        Despite editorial review, errors or omissions may occur in code samples, commands, diagrams,
        or explanations. If you discover an issue, please report it so we can correct it. StructroLearn
        is not liable for damages resulting from errors in published content.
      </p>
    ),
  },
  {
    id: "limitation-liability",
    title: "Limitation of Liability",
    content: (
      <p>
        In no event shall StructroLearn, its contributors, partners, or affiliates be liable for any
        direct, indirect, incidental, consequential, or special damages arising from the use of—or
        inability to use—this website or its content, including loss of data, system downtime,
        security incidents, or lost profits, even if advised of the possibility of such damages.
      </p>
    ),
  },
  {
    id: "acceptance",
    title: "Acceptance",
    content: (
      <p>
        By using StructroLearn, you acknowledge that you have read and understood this Disclaimer. If
        you do not agree, you should discontinue use of the website. This Disclaimer supplements our{" "}
        <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Important limitations on how you should use StructroLearn educational content."
      lastUpdated={lastUpdated}
      sections={sections}
    />
  );
}
