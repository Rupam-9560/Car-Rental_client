import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Shield, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError("All fields are required")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Admin login failed")
      }

      localStorage.setItem("admin", JSON.stringify(data.admin))

      navigate("/admin/dashboard")
    } catch (err) {
      setError(err.message || "Admin login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fffaf5] px-4 py-8 text-slate-950 overflow-x-hidden">
      <Card className="w-full max-w-md rounded-3xl border border-slate-100 shadow-2xl bg-white p-2 sm:p-4">
        <CardHeader className="text-center pb-4 sm:pb-6">
          <div className="mx-auto mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-100">
            <Shield size={28} className="text-red-500 sm:w-[34px] sm:h-[34px]" />
          </div>

          <CardTitle className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Rent<span className="text-red-500">Ride</span> Admin
          </CardTitle>

          <CardDescription className="text-xs sm:text-sm mt-1">
            Login to manage cars, users and bookings
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-4 sm:space-y-5 flex flex-col">
              <Field className="w-full">
                <FieldLabel className="mb-1.5 block text-sm font-semibold text-slate-800">Email</FieldLabel>
                <div className="flex items-center rounded-xl border bg-white px-3 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
                  <Mail size={18} className="text-red-500 flex-shrink-0" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="admin@rentride.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-slate-900 placeholder:text-gray-400"
                  />
                </div>
              </Field>

              <Field className="w-full">
                <FieldLabel className="mb-1.5 block text-sm font-semibold text-slate-800">Password</FieldLabel>
                <div className="flex items-center rounded-xl border bg-white px-3 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
                  <Lock size={18} className="text-red-500 flex-shrink-0" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-slate-900 placeholder:text-gray-400"
                  />
                </div>
              </Field>

              {error && (
                <FieldDescription className="text-center text-xs sm:text-sm font-semibold text-red-600 animate-shake">
                  {error}
                </FieldDescription>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-red-500 py-5 sm:py-6 text-base sm:text-lg font-bold hover:bg-red-600 transition-all mt-2 h-auto"
              >
                {loading ? "Logging in..." : "Login as Admin"}
              </Button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-xs sm:text-sm text-gray-500 hover:text-red-500 transition-colors mx-auto mt-2 pt-1 w-max"
              >
                Back to home
              </button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}