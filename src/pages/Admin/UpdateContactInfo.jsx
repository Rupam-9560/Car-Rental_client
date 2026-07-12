import { useEffect, useState } from "react"
import axios from "axios"
import { Clock, Mail, Phone, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function UpdateContactInfo() {
  const admin = JSON.parse(localStorage.getItem("admin"))

  const [form, setForm] = useState({
    phone: "",
    email: "",
    supportTime: "",
  })

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/contact-info`, {
        withCredentials: true,
      })

      setForm({
        phone: res.data.phone,
        email: res.data.email,
        supportTime: res.data.supportTime,
      })
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch contact info")
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/contact-info`,
        form,
        { withCredentials: true }
      )

      alert(res.data.message)
    } catch (err) {
      alert(err.response?.data?.message || "Contact update failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <AdminSidebar admin={admin} />

      <main className="lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        {/* Content canvas designed to auto-align across viewports */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-5 sm:p-8 shadow-xl border border-slate-100">
            <div className="mb-6 sm:mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-100">
                <Phone className="text-red-500" size={32} />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Update Contact Info</h1>
              <p className="mt-1.5 text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                Update public contact details shown on RentRide.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <Field label="Phone" icon={<Phone size={18} />}>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-slate-900 placeholder:text-gray-400"
                  required
                />
              </Field>

              <Field label="Email" icon={<Mail size={18} />}>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-slate-900 placeholder:text-gray-400"
                  required
                />
              </Field>

              <Field label="Support Time" icon={<Clock size={18} />}>
                <Input
                  name="supportTime"
                  value={form.supportTime}
                  onChange={handleChange}
                  placeholder="9 AM - 8 PM"
                  className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-slate-900 placeholder:text-gray-400"
                  required
                />
              </Field>

              <Button className="w-full rounded-xl bg-red-500 py-5 sm:py-6 text-base sm:text-lg font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 mt-2">
                <Save size={18} className="flex-shrink-0" />
                Update Contact Info
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

function Field({ label, icon, children }) {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">{label}</label>
      <div className="flex items-center rounded-xl border bg-white px-3 text-red-500 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        {children}
      </div>
    </div>
  )
}