import { useState } from "react"
import axios from "axios"
import { Lock, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserNavbar from "@/components/UserNavbar"
import UserSidebar from "@/components/UserSidebar"

export default function UpdatePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    window.location.href = "/login"
    return null
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match")
      return
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/update-password`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        { withCredentials: true }
      )

      alert(res.data.message)
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      alert(err.response?.data?.message || "Password update failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] text-gray-950 overflow-x-hidden">
      <UserNavbar setOpen={setOpen} user={user} />
      <UserSidebar open={open} setOpen={setOpen} user={user} />

      {/* Main Container tailored for grid layouts or dynamic sidebar offsets */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 flex items-center justify-center min-h-[calc(100vh-70px)]">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100">
          <div className="mb-6 sm:mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-100">
              <KeyRound className="text-red-500" size={28} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Update Password
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Keep your RentRide account secure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <PasswordField
              label="Old Password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
            />

            <PasswordField
              label="New Password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
            />

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <Button className="w-full rounded-xl bg-red-500 py-5 sm:py-6 text-base sm:text-lg hover:bg-red-600 font-bold transition-all mt-2">
              Update Password
            </Button>

            <a
              href="/user/dashboard"
              className="block text-center text-xs sm:text-sm text-gray-500 hover:text-red-500 transition-colors pt-2"
            >
              Back to Dashboard
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}

function PasswordField({ label, name, value, onChange }) {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm sm:text-base font-semibold text-gray-800">
        {label}
      </label>
      <div className="flex items-center rounded-xl border bg-white px-3 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
        <Lock size={18} className="text-red-500 flex-shrink-0" />
        <Input
          name={name}
          type="password"
          value={value}
          onChange={onChange}
          className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none"
          required
        />
      </div>
    </div>
  )
}