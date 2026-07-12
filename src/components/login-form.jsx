import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { Mail, Lock, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, form, {
        withCredentials: true,
      })

      localStorage.setItem("user", JSON.stringify(res.data.user))
      alert("Login Successful")
      navigate("/user/dashboard")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fffaf5] px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8">
        <div className="mb-7 text-center sm:mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">
            <Car className="text-red-500" size={32} />
          </div>

          <h1 className="text-2xl font-black sm:text-3xl">
            Rent<span className="text-red-500">Ride</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Login to book your ride
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              Password
            </label>

            <div className="flex items-center rounded-xl border px-3 py-1 sm:py-0">
              <Lock size={18} className="text-red-500" />
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="border-0 text-sm focus-visible:ring-0 sm:text-base"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-red-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button className="w-full rounded-xl bg-red-500 py-5 text-base hover:bg-red-600 sm:py-6 sm:text-lg">
            Login
          </Button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-bold text-red-500 hover:underline">
              Sign up
            </a>
          </p>

          <a href="/" className="block text-center text-sm text-gray-500 hover:text-red-500">
            Back to Home
          </a>
        </form>
      </div>
    </div>
  )
}