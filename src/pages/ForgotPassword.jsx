import { useState } from "react"
import axios from "axios"
import { Mail, KeyRound, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPassword() {
  const [step, setStep] = useState("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const sendOtp = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/forgot-password`,
        { email }
      )

      alert(res.data.message)
      setStep("otp")
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/verify-reset-otp`,
        { email, otp }
      )

      alert(res.data.message)

      localStorage.setItem("resetEmail", email)
      window.location.href = "/reset-password"
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff7f0] px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">
            {step === "email" ? (
              <KeyRound className="text-red-500" size={32} />
            ) : (
              <ShieldCheck className="text-red-500" size={32} />
            )}
          </div>

          <h1 className="mt-5 text-2xl font-black sm:text-3xl">
            {step === "email" ? "Forgot Password" : "Verify OTP"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            {step === "email"
              ? "Enter your email to receive OTP."
              : "Enter the OTP sent to your email."}
          </p>
        </div>

        {step === "email" ? (
          <form onSubmit={sendOtp} className="mt-7 space-y-5 sm:mt-8">
            <Field icon={<Mail size={18} />} label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-0 text-sm focus-visible:ring-0 sm:text-base"
                required
              />
            </Field>

            <Button
              disabled={loading}
              className="w-full rounded-xl bg-red-500 py-5 text-base hover:bg-red-600 sm:py-6 sm:text-lg"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-7 space-y-5 sm:mt-8">
            <Field icon={<ShieldCheck size={18} />} label="OTP">
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6 digit OTP"
                className="border-0 text-sm focus-visible:ring-0 sm:text-base"
                required
              />
            </Field>

            <Button
              disabled={loading}
              className="w-full rounded-xl bg-red-500 py-5 text-base hover:bg-red-600 sm:py-6 sm:text-lg"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="block w-full text-center text-sm font-semibold text-gray-500 hover:text-red-500"
            >
              Change Email / Resend OTP
            </button>
          </form>
        )}

        <a
          href="/login"
          className="mt-5 block text-center text-sm font-semibold text-gray-500 hover:text-red-500"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold sm:text-base">
        {label}
      </label>

      <div className="flex items-center rounded-xl border px-3 py-1 text-red-500 sm:py-0">
        {icon}
        {children}
      </div>
    </div>
  )
}