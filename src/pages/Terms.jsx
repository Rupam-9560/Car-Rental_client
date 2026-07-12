export default function Terms() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using RentRide."
    >
      <Section title="Welcome to RentRide">
        At RentRide, we aim to provide a safe, reliable, and transparent
        vehicle rental experience. By creating an account, making a booking,
        or using our platform, you agree to follow these terms.
      </Section>

      <Section title="Eligibility">
        To rent a vehicle, users must have a valid driving license, provide
        correct details, and follow all road safety rules.
      </Section>

      <Section title="Vehicle Booking">
        Booking confirmation depends on vehicle availability. RentRide may
        decline or cancel bookings in special cases.
      </Section>

      <Section title="User Responsibilities">
        Users must drive safely, maintain the vehicle properly, and report
        accidents, damage, theft, or breakdowns immediately.
      </Section>

      <Section title="Prohibited Activities">
        Vehicles cannot be used for illegal work, racing, commercial use
        without approval, or driving under alcohol/drugs.
      </Section>

      <Section title="Pricing & Payments">
        Rental charges may include vehicle rent, security deposit, late return
        charges, and damage-related charges if applicable.
      </Section>

      <Section title="Limitation of Liability">
        RentRide is not responsible for personal belongings left in vehicles
        or delays caused by traffic, weather, or emergencies.
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