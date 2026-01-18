import { getWebsiteName } from "../helpers/common";

const WebsiteName = getWebsiteName();
export default function PrivacyPolicy() {
  return (
    <section className="pt-32 pb-16  ">
      {" "}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-base text-gray-500 mb-12">
          Last updated: January 15, 2025
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Welcome to {WebsiteName}. We respect your privacy and are
              committed to protecting your personal data. This privacy policy
              will inform you about how we look after your personal data when
              you visit our website or use our services and tell you about your
              privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
              <li>
                <strong>Identity Data</strong> includes first name, last name,
                username or similar identifier.
              </li>
              <li>
                <strong>Contact Data</strong> includes billing address, delivery
                address, email address and telephone numbers.
              </li>
              <li>
                <strong>Financial Data</strong> includes payment card details.
              </li>
              <li>
                <strong>Transaction Data</strong> includes details about
                payments to and from you and other details of products and
                services you have purchased from us.
              </li>
              <li>
                <strong>Technical Data</strong> includes internet protocol (IP)
                address, your login data, browser type and version, time zone
                setting and location, browser plug-in types and versions,
                operating system and platform.
              </li>
              <li>
                <strong>Profile Data</strong> includes your username and
                password, purchases or orders made by you, your interests,
                preferences, feedback and survey responses.
              </li>
              <li>
                <strong>Usage Data</strong> includes information about how you
                use our website, products and services.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
              <li>
                To process and deliver your orders including managing payments,
                fees and charges, and collecting and recovering money owed to
                us.
              </li>
              <li>
                To manage our relationship with you including notifying you
                about changes to our terms or privacy policy and asking you to
                leave a review or take a survey.
              </li>
              <li>
                To enable you to participate in promotions, competitions or
                surveys.
              </li>
              <li>
                To administer and protect our business and this website
                including troubleshooting, data analysis, testing, system
                maintenance, support, reporting and hosting of data.
              </li>
              <li>
                To deliver relevant website content and advertisements to you
                and measure or understand the effectiveness of the advertising
                we serve to you.
              </li>
              <li>
                To use data analytics to improve our website, products/services,
                marketing, customer relationships and experiences.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed. In addition, we limit
              access to your personal data to those employees, agents,
              contractors and other third parties who have a business need to
              know.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              We have put in place procedures to deal with any suspected
              personal data breach and will notify you and any applicable
              regulator of a breach where we are legally required to do so.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Retention
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              We will only retain your personal data for as long as reasonably
              necessary to fulfill the purposes we collected it for, including
              for the purposes of satisfying any legal, regulatory, tax,
              accounting or reporting requirements. We may retain your personal
              data for a longer period in the event of a complaint or if we
              reasonably believe there is a prospect of litigation in respect to
              our relationship with you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Legal Rights
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data including the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Our website uses cookies to distinguish you from other users of
              our website. This helps us to provide you with a good experience
              when you browse our website and also allows us to improve our
              site. A cookie is a small file of letters and numbers that we
              store on your browser or the hard drive of your computer if you
              agree.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Links
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              This website may include links to third-party websites, plug-ins
              and applications. Clicking on those links or enabling those
              connections may allow third parties to collect or share data about
              you. We do not control these third-party websites and are not
              responsible for their privacy statements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-base text-gray-700 mb-2">
                <strong>Email:</strong> privacy@{WebsiteName}.com
              </p>
              <p className="text-base text-gray-700 mb-2">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p className="text-base text-gray-700">
                <strong>Address:</strong> 123 Healthy St, New York, NY 10001
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
