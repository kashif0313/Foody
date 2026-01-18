import { getWebsiteName } from "../helpers/common";

const WebsiteName = getWebsiteName();

export default function TermsAndConditions() {
  return (
    <section className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Terms & Conditions
        </h1>
        <p className="text-base text-gray-500 mb-12">
          Last updated: January 15, 2025
        </p>

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Welcome to {WebsiteName}. These Terms & Conditions govern your
              access to and use of our website, products, and services. By
              accessing or using our platform, you agree to be bound by these
              terms. If you do not agree with any part of these terms, please do
              not use our services.
            </p>
          </section>

          {/* Use of Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Use of Our Services
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              You agree to use our website and services only for lawful purposes
              and in accordance with these Terms & Conditions. You must not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
              <li>Use the website in any way that violates applicable laws</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the security or performance of the website</li>
              <li>
                Use our content for commercial purposes without permission
              </li>
            </ul>
          </section>

          {/* Account Responsibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Account Responsibility
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              If you create an account on {WebsiteName}, you are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account.
            </p>
          </section>

          {/* Payments */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Payments & Billing
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              All prices, fees, and charges displayed on our website are subject
              to change without notice. By making a purchase, you agree to
              provide accurate billing information and authorize us to charge
              the applicable fees.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              All content on {WebsiteName}, including text, graphics, logos,
              images, and software, is the property of {WebsiteName} or its
              licensors and is protected by intellectual property laws. You may
              not copy, reproduce, or distribute any content without prior
              written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {WebsiteName} shall not be liable for any indirect, incidental,
              special, or consequential damages arising out of or related to
              your use of the website or services.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Termination
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your access to our
              services at any time, without notice, if you violate these Terms &
              Conditions.
            </p>
          </section>

          {/* Changes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to These Terms
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              We may update these Terms & Conditions from time to time. Any
              changes will be posted on this page, and continued use of the
              website constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms & Conditions, please
              contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-base text-gray-700 mb-2">
                <strong>Email:</strong> support@{WebsiteName}.com
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
