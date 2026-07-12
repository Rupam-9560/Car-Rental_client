import { useState } from "react"
import axios from "axios"
import { Star } from "lucide-react"

import UserNavbar from "@/components/UserNavbar"
import UserSidebar from "@/components/UserSidebar"

export default function AddTestimonial() {
  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))

  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(5)

  if (!user) {
    window.location.href = "/login"
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/testimonial`,
        {
          message,
          rating,
        },
        {
          withCredentials: true,
        }
      )

      alert(res.data.message)

      setMessage("")
      setRating(5)
      window.location.href = "/user/testimonials"
    } catch (err) {
      alert(err.response?.data?.message || "Testimonial submit failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] text-gray-950 overflow-x-hidden">
      <UserNavbar setOpen={setOpen} user={user} />
      <UserSidebar open={open} setOpen={setOpen} user={user} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex justify-center items-center min-h-[calc(100vh-70px)]">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-5 sm:p-8 shadow-xl border border-gray-100">
          <div className="mb-6 sm:mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-100">
              <Star className="text-red-500" size={28} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Add Testimonial</h1>

            <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
              Share your RentRide experience with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="mb-1.5 block text-sm sm:text-base font-semibold text-gray-800">
                Your Experience
              </label>

              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your experience..."
                className="w-full rounded-xl border bg-white p-4 outline-none text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm sm:text-base font-semibold text-gray-800">
                Rating
              </label>

              <div className="flex items-center rounded-xl border bg-white px-1 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-transparent px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 outline-none"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            <button className="w-full rounded-xl bg-red-500 py-3.5 sm:py-4 font-bold text-white hover:bg-red-600 transition-colors text-sm sm:text-base mt-2">
              Submit Testimonial
            </button>

            <a
              href="/user/dashboard"
              className="block text-center text-xs sm:text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors pt-2"
            >
              Back to Dashboard
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}