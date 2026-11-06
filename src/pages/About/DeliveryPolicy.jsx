import PageHeading from "../../HOC/Header/PageHeading";
import LegalSection from "../../component/ui/LegalSection";

const ShippingPolicy = () => {
  return (
    <>
      <PageHeading head="Shipping Policy" />

      <LegalSection title="Shipping Policy">
        {/* Introduction */}
        <p>
          At RAG Strength & Nutrition (Gomzi Supplement), we strive to ensure
          your order reaches you in a safe, timely, and reliable manner. Please
          read our shipping policy below for details on order processing,
          delivery timelines, charges, and tracking.
        </p>

        {/* Last Updated */}
        <p className="mt-3">
          <strong>Last Updated:</strong> August 14, 2026
        </p>

        {/* Order Processing Time */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">Order Processing Time</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              All orders are processed within 1–2 business days after payment
              confirmation.
            </li>

            <li>
              Orders placed on Sundays or public holidays will be processed on
              the next working day.
            </li>

            <li>
              You will receive an order confirmation email/SMS once your order
              has been placed successfully.
            </li>
          </ul>
        </div>

        {/* Shipping Timelines */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">Shipping Timelines</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Within Surat/Gujarat:</strong> 2–4 business days
            </li>

            <li>
              <strong>Rest of India:</strong> 4–7 business days
            </li>

            <li>
              <strong>Remote/Rural areas:</strong> 7–10 business days
            </li>
          </ul>

          <p className="mt-4">
            Please note that delivery timelines are estimates and may vary due
            to courier delays, weather conditions, or other unforeseen
            circumstances beyond our control.
          </p>
        </div>

        {/* Shipping Charges */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">Shipping Charges</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>We offer free shipping on orders above ₹999.</li>

            <li>
              A flat shipping fee of ₹49–99 will be applicable on orders below
              the free shipping threshold.
            </li>

            <li>
              Any applicable shipping charges will be clearly displayed at
              checkout before you complete your purchase.
            </li>
          </ul>
        </div>

        {/* Order Tracking */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">Order Tracking</h3>

          <p>
            Once your order is shipped, you will receive a tracking number via
            email/SMS. You can use this number to track your shipment&apos;s
            status directly through our courier partner&apos;s website.
          </p>
        </div>

        {/* Shipping Partners */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">Shipping Partners</h3>

          <p>
            We work with trusted courier and logistics partners to ensure safe
            and timely delivery of all orders across India.
          </p>
        </div>

        {/* Delayed or Lost Shipments */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">Delayed or Lost Shipments</h3>

          <p>
            If your order has not arrived within the expected delivery window,
            please contact our support team with your order number. We will
            coordinate with our courier partner to resolve the issue promptly.
          </p>
        </div>

        {/* Incorrect Address / Failed Delivery */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">
            Incorrect Address / Failed Delivery
          </h3>

          <p>
            Please ensure your shipping address, pin code, and contact number
            are accurate at the time of placing the order. RAG Strength &
            Nutrition is not responsible for delays or non-delivery due to
            incorrect or incomplete address details provided by the customer.
            Re-shipping charges may apply in such cases.
          </p>
        </div>

        {/* Damaged or Tampered Packages */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">
            Damaged or Tampered Packages
          </h3>

          <p>
            If you receive a damaged or tampered package, please do not accept
            the delivery and contact us immediately at{" "}
            <a
              href="mailto:ragstrengthnutrition@gmail.com"
              className="underline"
            >
              ragstrengthnutrition@gmail.com
            </a>{" "}
            or{" "}
            <a href="tel:+919875270200" className="underline">
              +91 98752 70200
            </a>{" "}
            with photos/video of the package for a quick resolution.
          </p>
        </div>

        {/* International Shipping */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">International Shipping</h3>

          <p>
            Currently, we only ship within India. We do not offer international
            shipping at this time.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-bold text-lg sm:text-xl mb-3">Contact Us</h3>

          <p>
            For any questions or concerns regarding your shipment, please reach
            out to us:
          </p>

          <div className="mt-4 space-y-3">
            <p>
              <strong>RAG Strength & Nutrition</strong>
            </p>

            <p>
              G-23, Time Square, Gaurav Path Road, Beside Gajera Global School,
              Pal Gam, Surat – 394510, Gujarat, India
            </p>

            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:ragstrengthnutrition@gmail.com"
                className="underline"
              >
                ragstrengthnutrition@gmail.com
              </a>
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+919875270200" className="underline">
                +91 98752 70200
              </a>
            </p>
          </div>
        </div>
      </LegalSection>
    </>
  );
};

export default ShippingPolicy;
