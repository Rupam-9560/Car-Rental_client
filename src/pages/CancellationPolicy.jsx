export default function CancellationPolicy() {
  return (
    <PolicyLayout
      title="Cancellation & Refund Policy"
      subtitle="We understand that plans can change. Here is how cancellations work at RentRide."
    >
      <Section title="Cancellation Before Vehicle Allocation">
        If a booking is cancelled before a vehicle is assigned, the request is
        usually processed without penalty.
      </Section>

      <Section title="Cancellation After Vehicle Allocation">
        If a vehicle has already been assigned, cancellation charges may apply
        depending on pickup time and booking status.
      </Section>

      <Section title="No-Show Policy">
        If the user does not arrive at the pickup location or does not respond
        within the waiting period, the booking may be marked as No Show.
      </Section>

      <Section title="Refund Processing">
        Approved refunds may take 5–10 business days depending on payment
        method and banking process.
      </Section>

      <Section title="Exceptional Cases">
        RentRide may review special cases such as medical emergencies, natural
        disasters, or government restrictions.
      </Section>

      <Section title="Need Help?">
        For cancellation or refund support, contact us at support@rentride.com
        or call +91 98765 43210.
      </Section>
    </PolicyLayout>
  )
}

function PolicyLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#fffaf5] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-20 xl:px-32 xl:py-12">
      <a
        href="/"
        className="inline-block text-sm font-bold text-red-500 hover:underline sm:text-base"
      >
        ← Back to RentRide
      </a>

      <div className="mt-5 rounded-2xl bg-white p-5 shadow-xl sm:mt-6 sm:p-6 md:mt-8 md:rounded-3xl md:p-8">
        <p className="text-xs font-bold text-red-500 sm:text-sm md:text-base">
          RENT RIDE POLICY
        </p>

        <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
          {subtitle}
        </p>

        <p className="mt-2 text-xs text-gray-400 sm:text-sm">
          Last updated: 2026
        </p>

        <div className="mt-7 space-y-6 sm:mt-8 sm:space-y-7 md:mt-10 md:space-y-8">
          {children}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-black leading-tight text-gray-900 sm:text-xl md:text-2xl">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-7 text-gray-600 sm:mt-3 sm:text-base sm:leading-8">
        {children}
      </p>
    </section>
  )
}