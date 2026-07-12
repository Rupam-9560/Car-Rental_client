import { useEffect, useState } from "react"
import axios from "axios"
import { Star, MessageCircle } from "lucide-react"

import UserNavbar from "@/components/UserNavbar"
import UserSidebar from "@/components/UserSidebar"

export default function Testimonials() {
  const [open, setOpen] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/testimonials`)
      setTestimonials(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    window.location.href = "/login"
    return null
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] text-gray-950 overflow-x-hidden">
      <UserNavbar setOpen={setOpen} user={user} />
      <UserSidebar open={open} setOpen={setOpen} user={user} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8 sm:mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-100">
            <MessageCircle className="text-red-500" size={28} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Testimonials
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Read approved customer experiences.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-6 sm:p-10 text-center shadow-md border border-gray-100">
            <p className="text-sm sm:text-base font-semibold text-gray-500 animate-pulse">
              Loading testimonials...
            </p>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="rounded-3xl bg-white p-5 sm:p-6 shadow-md border border-gray-100 transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black truncate text-gray-900">
                      {item.user?.name || "RentRide User"}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500">
                      Customer Review
                    </p>
                  </div>

                  <div className="flex text-yellow-400 flex-shrink-0 pt-1">
                    {[...Array(Number(item.rating))].map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        className="fill-yellow-400 text-yellow-400 sm:w-4 sm:h-4"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-gray-600 break-words flex-1">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-6 sm:p-10 text-center shadow-md border border-dashed border-gray-200 bg-[#fffaf5]">
            <h2 className="text-xl sm:text-2xl font-black text-gray-800">No Testimonials Yet</h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Approved testimonials will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}