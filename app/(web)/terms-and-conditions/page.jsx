export default function TermsAndConditions() {
  return (
    <section className="mt-28 text-gray-300 px-6 md:px-16 py-12 md:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Terms & Conditions
        </h1>

        <p className="text-lg text-gray-400">
          Welcome to our e-commerce store. By accessing or using our website,
          you agree to comply with and be bound by the following terms and
          conditions.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              1. Introduction
            </h2>
            <p className="mt-2 text-gray-400">
              These Terms & Conditions govern your use of our platform. By
              making a purchase, you acknowledge that you have read, understood,
              and agreed to these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">2. Eligibility</h2>
            <p className="mt-2 text-gray-400">
              You must be at least 18 years old or have legal parental/guardian
              consent to use this website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              3. Orders & Payment
            </h2>
            <p className="mt-2 text-gray-400">
              All orders are subject to availability. Prices are listed in USD
              and are subject to change without notice. Payments must be
              completed before orders are shipped.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              4. Shipping & Delivery
            </h2>
            <p className="mt-2 text-gray-400">
              We aim to process and ship orders promptly. Delivery times may
              vary depending on your location and other external factors.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              5. Returns & Refunds
            </h2>
            <p className="mt-2 text-gray-400">
              You may request a return or refund within 14 days of delivery,
              provided the product is unused and in its original packaging.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              6. Privacy Policy
            </h2>
            <p className="mt-2 text-gray-400">
              Your personal information is kept confidential and used only in
              accordance with our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              7. Changes to Terms
            </h2>
            <p className="mt-2 text-gray-400">
              We reserve the right to modify these Terms & Conditions at any
              time. Updates will be posted on this page.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 pt-8">
          If you have any questions about these Terms & Conditions, please
          contact us at{" "}
          <span className="text-purple-400">support@example.com</span>.
        </p>
      </div>
    </section>
  );
}
