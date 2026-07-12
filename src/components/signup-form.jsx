import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { User, Mail, Phone, Lock, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SignupForm() {
  const navigate = useNavigate()
  const [agree, setAgree] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (!agree) {
      alert("Please accept Terms & Conditions")
      return
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, {
        name: form.name,
        email: form.email,
        number: form.number,
        password: form.password,
      })

      alert("Account Created Successfully")
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fffaf5] px-4 py-8 sm:px-6 sm:py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8">
        <div className="mb-7 text-center sm:mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">
            <Car className="text-red-500" size={32} />
          </div>

          <h1 className="text-2xl font-black sm:text-3xl">
            Join Rent<span className="text-red-500">Ride</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Create account and start booking
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border px-3 py-1 sm:py-0">
              <User size={18} className="text-red-500" />
              <Input
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="border-0 text-sm focus-visible:ring-0 sm:text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              Email
            </label>

            <div className="flex items-center rounded-xl border px-3 py-1 sm:py-0">
              <Mail size={18} className="text-red-500" />
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="border-0 text-sm focus-visible:ring-0 sm:text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold sm:text-base">
              Phone Number
            </label>

            <div className="flex items-center rounded-xl border px-3 py-1 sm:py-0">
              <Phone size={18} className="text-red-500" />
              <Input
                name="number"
                placeholder="Enter phone number"
                value={form.number}
                onChange={handleChange}
                className="border-0 text-sm focus-visible:ring-0 sm:text-base"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold sm:text-base">
                Password
              </label>

              <div className="flex items-center rounded-xl border px-3 py-1 sm:py-0">
                <Lock size={18} className="text-red-500" />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="border-0 text-sm focus-visible:ring-0 sm:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold sm:text-base">
                Confirm
              </label>

              <div className="flex items-center rounded-xl border px-3 py-1 sm:py-0">
                <Lock size={18} className="text-red-500" />
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="border-0 text-sm focus-visible:ring-0 sm:text-base"
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <label
              htmlFor="terms"
              className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-600 sm:items-center"
            >
              <input
                type="checkbox"
                id="terms"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-red-500 sm:mt-0"
              />

              <span>
                I agree with the{" "}
                <a
                  href="/terms"
                  className="font-semibold text-red-500 hover:underline"
                >
                  Terms & Conditions
                </a>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            disabled={!agree}
            className="w-full rounded-xl bg-red-500 py-5 text-base font-semibold hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:py-6 sm:text-lg"
          >
            Create Account
          </Button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-bold text-red-500 hover:underline">
              Login
            </a>
          </p>

          <a
            href="/"
            className="block text-center text-sm text-gray-500 hover:text-red-500"
          >
            Back to Home
          </a>
        </form>
      </div>
    </div>
  )
}