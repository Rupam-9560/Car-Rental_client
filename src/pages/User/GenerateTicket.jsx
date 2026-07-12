import { useState } from "react"
import axios from "axios"
import { LifeBuoy } from "lucide-react"
import UserNavbar from "@/components/UserNavbar"
import UserSidebar from "@/components/UserSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function GenerateTicket() {
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))

  const [form, setForm] = useState({
    subject: "",
    message: "",
  })

  if (!user) {
    window.location.href = "/login"
    return null
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/generate-ticket`, form, {
        withCredentials: true,
      })

      alert(res.data.message)
      window.location.href = "/user/ticket-history"
    } catch (err) {
      console.log("TICKET ERROR:", err.response?.data || err.message)

      alert(
        err.response?.data?.message ||
        err.message ||
        "Ticket failed"
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#fff7f0] text-gray-950 overflow-x-hidden">
      <UserNavbar setOpen={setOpen} user={user} />
      <UserSidebar open={open} setOpen={setOpen} user={user} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex justify-center items-center min-h-[calc(100vh-70px)]">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-5 sm:p-8 shadow-xl border border-gray-100">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-50">
              <LifeBuoy className="text-red-500 animate-spin-slow" size={32} />
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">Generate Ticket</h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
              Raise a support request to the RentRide admin panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            <div>
              <label className="mb-1.5 block text-sm sm:text-base font-semibold text-gray-800">
                Subject
              </label>
              <Input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Booking issue / Profile issue"
                className="rounded-xl border bg-white px-4 py-2.5 sm:py-3 h-auto text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:border-red-400 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm sm:text-base font-semibold text-gray-800">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-xl border bg-white p-4 outline-none text-sm sm:text-base focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all text-gray-900 placeholder:text-gray-400"
                placeholder="Explain your problem dynamically..."
                required
              />
            </div>

            <Button className="w-full rounded-xl bg-red-500 py-5 sm:py-6 text-base sm:text-lg hover:bg-red-600 font-bold transition-all mt-2">
              Submit Ticket
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}