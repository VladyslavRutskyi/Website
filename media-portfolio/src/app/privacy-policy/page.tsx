export const metadata = {
  title: "Privacy Policy | Vladyslav Rutskyi Creative Studios",
  description: "Privacy Policy for Vladyslav Rutskyi Creative Studios, a California-based videography, photography, and creative marketing studio.",
};

const lastUpdated = "September 14, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <header className="legal-topbar">
        <div className="legal-brand">Vladyslav Rutskyi Creative Studios</div>
        <nav className="legal-nav" aria-label="Legal navigation">
          <a href="/Website/">Home</a>
          <a href="/Website/terms">Terms</a>
        </nav>
      </header>

      <main className="legal-shell">
        <article className="legal-card">
          <p className="eyebrow" style={{ color: '#c8ff3d', marginBottom: '12px' }}>Privacy Policy</p>
          <h1>Privacy Policy</h1>
          <p><strong>Last Updated:</strong> {lastUpdated}</p>

          <p>
            This Privacy Policy explains how Vladyslav Rutskyi Creative Studios (“we,” “our,” or
            “us”) collects, uses, stores, and shares information when you visit our website, contact us,
            request a quote, submit a review, or otherwise interact with our services.
          </p>

          <p>
            We operate as a California-based creative production, videography, photography, and
            marketing services business. This Privacy Policy is intended to be a practical website
            privacy notice based on the information and tools currently used by this website. It is not
            legal advice and should be reviewed by counsel for your specific business structure and
            compliance needs.
          </p>

          <h2>1. Who operates this website</h2>
          <p>
            Vladyslav Rutskyi Creative Studios<br />
            Email: <a href="mailto:vladyslavrutskyi@gmail.com">vladyslavrutskyi@gmail.com</a>
          </p>

          <h2>2. Information we may collect</h2>
          <p>Depending on how you interact with the website, we may collect some or all of the following:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number, if you voluntarily provide it</li>
            <li>Company or business name, if you provide it</li>
            <li>Project information and service requirements</li>
            <li>Messages submitted through contact or inquiry forms</li>
            <li>Review submissions, including your name or business name and the text of the review</li>
            <li>Google account identity information, if Google Sign-In is used in a future implementation</li>
            <li>IP address, browser type, device information, or related technical data when technically collected by the hosting or service provider</li>
            <li>Cookies or similar technologies, if used by the website or third-party tools</li>
            <li>Any additional information you voluntarily provide in connection with a project inquiry or review</li>
          </ul>

          <p>
            Based on the code currently in this project, the actual form fields in the website collect:
            name, email address, project message, and review name/rating/review text. The review data is
            submitted to the site’s review API and stored in a database table used for approved reviews.
            The booking form also includes selected package information and an estimated total.
          </p>

          <h2>3. Why we collect information</h2>
          <p>We may use personal information to:</p>
          <ul>
            <li>Respond to inquiries and contact requests</li>
            <li>Provide requested videography, photography, and marketing services</li>
            <li>Prepare estimates, proposals, or project planning discussions</li>
            <li>Communicate with clients and collaborators</li>
            <li>Schedule or manage projects</li>
            <li>Process review submissions and feature approved reviews</li>
            <li>Authenticate accounts if account sign-in is enabled in a future version</li>
            <li>Maintain website security and prevent misuse or fraud</li>
            <li>Improve website functionality and user experience</li>
            <li>Operate necessary technical systems and service providers</li>
          </ul>

          <h2>4. Google Sign-In and Google account information</h2>
          <p>
            As of the current code audit, this website does not currently implement Google OAuth,
            Google Sign-In, Firebase authentication, or Gmail API access. No Google account scope,
            Gmail mailbox access, or Google user profile fields are requested by the current website
            implementation.
          </p>
          <p>
            If Google Sign-In or another Google authentication feature is added in the future, we would
            identify the exact Google permissions and data requested before enabling it. We do not claim
            access to Gmail messages unless the code specifically requests Gmail API scopes or mailbox
            permissions.
          </p>

          <h2>5. Third-party services used by this website</h2>
          <p>Based on the code currently in this repository, the main third-party services are:</p>
          <ul>
            <li>EmailJS: used to send inquiry emails from the browser to the business email address.</li>
            <li>Cloudflare Worker / D1 database: used by the media API to store review entries and lead-related data.</li>
            <li>Hosting and static deployment environment for the website itself.</li>
          </ul>
          <p>
            The current project does not include Google Analytics, Google Tag Manager, Meta Pixel,
            TikTok Pixel, Microsoft Clarity, Hotjar, Google Ads conversion tracking, Firebase,
            reCAPTCHA, or SMS marketing tools.
          </p>

          <h2>6. Cookies and similar technologies</h2>
          <p>
            Based on the current implementation, this website does not appear to set a cookie banner or
            use non-essential advertising or analytics cookies. We are not currently using cookies for
            marketing, behavioral tracking, or targeted advertising. If a future feature requires
            non-essential tracking, we will update this policy and provide a clear notice and consent
            mechanism before enabling it.
          </p>
          <p>
            We may still use strictly necessary technical cookies or session behavior if a service
            provider or platform requires them for secure operation, but no such non-essential tracking
            is currently implemented in the code in this repository.
          </p>

          <h2>7. Analytics and tracking</h2>
          <p>
            No Google Analytics, ad tracking, behavioral analytics, social media pixels, or similar
            tracking scripts are currently implemented in the reviewed code. We do not currently use
            third-party remarketing or audience building tools on this website.
          </p>

          <h2>8. Data sharing</h2>
          <p>
            We may share personal information with trusted service providers only as necessary to
            operate the website and provide our services. Examples include email delivery services,
            hosting providers, database services, and technical infrastructure providers.
          </p>
          <p>
            We do not sell personal information. We may disclose information when required by law,
            court order, legal process, or to protect our rights, property, or safety, or the safety
            of others.
          </p>

          <h2>9. Data retention</h2>
          <p>
            We retain personal information only as long as necessary to fulfill the purpose for which it
            was collected, respond to questions, manage project requests, maintain records, comply with
            legal obligations, and protect against disputes or misuse. Review submissions and inquiry
            records may be kept for internal business records and client communication purposes.
          </p>

          <h2>10. Data security</h2>
          <p>
            We use reasonable administrative, technical, and organizational measures to protect the
            information we collect. This includes using secure hosting and service providers, limiting
            access to project-related information, and taking measures to reduce unauthorized access.
          </p>
          <p>
            No method of transmission or storage is completely secure. We cannot guarantee that data is
            immune from unauthorized access, misuse, or disclosure, and no system should be described as
            “guaranteed secure” in absolute terms.
          </p>

          <h2>11. California privacy rights</h2>
          <p>
            California residents may have certain rights under California privacy laws, including rights
            to request information about categories of personal information collected, to request
            deletion of personal information in certain circumstances, and to opt out of the sale of
            personal information. However, whether a business is subject to all applicable California
            privacy obligations depends on the specific business facts, data practices, and legal
            structure.
          </p>
          <p>
            This website does not currently operate a broad ad-tech or tracking business, does not sell
            personal information, and does not currently use Google Analytics or other advertising
            tracking tools. Nonetheless, if you are a California resident and would like to request
            information about the personal information this website has collected or ask about a privacy
            request, contact us at <a href="mailto:vladyslavrutskyi@gmail.com">vladyslavrutskyi@gmail.com</a>.
          </p>
          <p>
            This notice is intended as a practical website disclosure and should be reviewed by counsel for
            final CCPA/CPRA applicability analysis, especially if this business expands into additional
            marketing systems, CRM tools, or data brokerage activities.
          </p>

          <h2>12. Children’s privacy</h2>
          <p>
            This website is not intended for children under the age of 13, and we do not knowingly
            collect personal information from children under 13. If we learn that we have collected
            personal information from a child under 13 without appropriate consent, we will take
            reasonable steps to delete it.
          </p>

          <h2>13. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices,
            services, or legal requirements. Any updated policy will be posted with a revised “Last
            Updated” date. Continued use of the website after a change means you accept the updated
            policy.
          </p>

          <h2>14. Contact information</h2>
          <p>
            If you have questions, concerns, or requests related to this Privacy Policy or your personal
            information, please contact us at:<br />
            Vladyslav Rutskyi Creative Studios<br />
            Email: <a href="mailto:vladyslavrutskyi@gmail.com">vladyslavrutskyi@gmail.com</a>
          </p>
        </article>
      </main>
    </div>
  );
}
