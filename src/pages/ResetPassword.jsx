import { useState } from "react"
import axios from "axios"
import { Lock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ResetPassword() {
  const savedEmail = localStorage.getItem("resetEmail") || ""

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState(false)

  if (!savedEmail) {
    window.location.href = "/forgot-password"
    return null
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.newPassword !== form.confirmPassword) {
      alert("Password and confirm password do not match")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/reset-password`,
        {
          email: savedEmail,
          newPassword: form.newPassword,
        }
      )

      alert(res.data.message)

      localStorage.removeItem("resetEmail")
      window.location.href = "/login"
    } catch (err) {
      alert(err.response?.data?.message || "Password reset failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff7f0] px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">
            <ShieldCheck className="text-red-500" size={32} />
          </div>

          <h1 className="mt-5 text-2xl font-black sm:text-3xl">
            Reset Password
          </h1>

          <p className="mt-2 break-words text-sm leading-6 text-gray-500 sm:text-base">
            Create a new password for {savedEmail}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5 sm:mt-8">
          <Field label="New Password">
            <Input
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              className="border-0 text-sm focus-visible:ring-0 sm:text-base"
              required
            />
          </Field>

          <Field label="Confirm Password">
            <Input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border-0 text-sm focus-visible:ring-0 sm:text-base"
              required
            />
          </Field>

          <Button
            disabled={loading}
            className="w-full rounded-xl bg-red-500 py-5 text-base hover:bg-red-600 sm:py-6 sm:text-lg"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold sm:text-base">
        {label}
      </label>

      <div className="flex items-center rounded-xl border px-3 py-1 sm:py-0">
        <Lock size={18} className="text-red-500" />
        {children}
      </div>
    </div>
  )
}