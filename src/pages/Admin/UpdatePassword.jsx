import { useState } from "react"
import axios from "axios"
import { Lock, KeyRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function UpdatePassword() {
  const admin = JSON.parse(localStorage.getItem("admin"))

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      form.newPassword !== form.confirmPassword
    ) {
      alert("Passwords do not match")
      return
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/update-password`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          withCredentials: true,
        }
      )

      alert(res.data.message)

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Password update failed"
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <AdminSidebar admin={admin} />

      <main className="lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        {/* Dynamic content spacing that centers beautifully on tall viewports */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-5 sm:p-8 shadow-xl border border-slate-100">
            <div className="mb-6 sm:mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-100">
                <KeyRound
                  className="text-red-500"
                  size={32}
                />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Update Password
              </h1>

              <p className="mt-1.5 text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                Change your admin password securely.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5"
            >
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

              <Button className="w-full rounded-xl bg-red-500 py-5 sm:py-6 text-base sm:text-lg font-bold hover:bg-red-600 transition-all mt-2">
                Update Password
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

function PasswordField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">
        {label}
      </label>

      <div className="flex items-center rounded-xl border bg-white px-3 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
        <Lock
          size={18}
          className="text-red-500 flex-shrink-0"
        />

        <Input
          name={name}
          type="password"
          value={value}
          onChange={onChange}
          className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-slate-900 placeholder:text-gray-400"
          required
        />
      </div>
    </div>
  )
}