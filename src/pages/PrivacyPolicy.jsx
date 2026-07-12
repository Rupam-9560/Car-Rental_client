export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="Your privacy matters to us. This page explains how RentRide handles your information."
    >
      <Section title="Information We Collect">
        We may collect your name, email address, phone number, date of birth,
        booking history, and vehicle preferences.
      </Section>

      <Section title="How We Use Your Information">
        Your information is used to create your account, manage bookings,
        provide support, and improve our services.
      </Section>

      <Section title="Data Security">
        We use reasonable security measures to protect user information from
        unauthorized access or misuse.
      </Section>

      <Section title="Sharing of Information">
        RentRide does not sell personal data. Information may be shared only
        when required by law or for service operations.
      </Section>

      <Section title="Cookies">
        Cookies may be used to maintain login sessions, improve performance,
        and provide a better user experience.
      </Section>

      <Section title="User Rights">
        Users may request to update, correct, or delete their account
        information, subject to applicable requirements.
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