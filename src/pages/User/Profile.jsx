import { useState } from "react"
import axios from "axios"
import { User, Mail, Phone, VenusAndMars } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserNavbar from "@/components/UserNavbar"
import UserSidebar from "@/components/UserSidebar"

export default function Profile() {
  const [open, setOpen] = useState(false)
  const savedUser = JSON.parse(localStorage.getItem("user"))

  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    number: savedUser?.number || "",
    gender: savedUser?.gender || "male",
    Date_of_Birth: savedUser?.Date_of_Birth || "",
    address: savedUser?.address || "",
    country: savedUser?.country || "",
    state: savedUser?.state || "",
  })

  if (!savedUser) {
    window.location.href = "/login"
    return null
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/profile`,
        form,
        { withCredentials: true }
      )

      localStorage.setItem("user", JSON.stringify(res.data.user))
      alert("Profile updated successfully")
    } catch (err) {
      alert(err.response?.data?.message || "Profile update failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] text-gray-950 overflow-x-hidden">
      <UserNavbar setOpen={setOpen} user={savedUser} />
      <UserSidebar open={open} setOpen={setOpen} user={savedUser} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex justify-center items-center min-h-[calc(100vh-70px)]">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-5 sm:p-8 shadow-xl border border-gray-100">
          <div className="mb-6 sm:mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-100">
              <User className="text-red-500" size={32} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">My Profile</h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">Manage your RentRide account details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <Field icon={<User size={18} />} label="Full Name">
              <Input name="name" value={form.name} onChange={handleChange} className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900" required />
            </Field>

            <Field icon={<Mail size={18} />} label="Email">
              <Input name="email" type="email" value={form.email} onChange={handleChange} className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900" required />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={<Phone size={18} />} label="Phone Number">
                <Input name="number" value={form.number} onChange={handleChange} className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900" required />
              </Field>

              <Field label="Date of Birth">
                <Input
                  name="Date_of_Birth"
                  type="date"
                  value={form.Date_of_Birth}
                  onChange={handleChange}
                  className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900 min-h-[46px]"
                />
              </Field>
            </div>

            <Field label="Address">
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Country">
                <Input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900"
                />
              </Field>

              <Field label="State">
                <Input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900"
                />
              </Field>
            </div>

            <div>
              <label className="mb-1.5 block text-sm sm:text-base font-semibold text-gray-800">Gender</label>
              <div className="flex items-center rounded-xl border bg-white px-3 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
                <VenusAndMars size={18} className="text-red-500 flex-shrink-0" />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full bg-transparent px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <Button className="w-full rounded-xl bg-red-500 py-5 sm:py-6 text-base sm:text-lg hover:bg-red-600 font-bold transition-all mt-2">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

function Field({ label, icon, children }) {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm sm:text-base font-semibold text-gray-800">{label}</label>
      <div className="flex items-center rounded-xl border bg-white px-3 text-red-500 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        {children}
      </div>
    </div>
  )
}