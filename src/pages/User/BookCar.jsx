import { useState } from "react"
import { useState, useRef } from "react"
import axios from "axios"
import { Calendar, MapPin, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserNavbar from "@/components/UserNavbar"
import UserSidebar from "@/components/UserSidebar"

export default function BookCar() {
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))
  const car = JSON.parse(localStorage.getItem("selectedCar"))
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchTimeout = useRef(null)


  const getImageUrl = (image) => {
  if (!image) {
    return "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900"
  }
  return image.startsWith("http")
    ? image
    : `${import.meta.env.VITE_BASE_URL}${image}`
}

  const [form, setForm] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    message: "",
  })

  if (!user) {
    window.location.href = "/login"
    return null
  }

  if (!car) {
    window.location.href = "/user/dashboard"
    return null
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleLocationSearch = (value) => {
  setForm({ ...form, pickupLocation: value })

  if (searchTimeout.current) clearTimeout(searchTimeout.current)

  if (value.length < 3) {
    setSuggestions([])
    setShowSuggestions(false)
    return
  }

  searchTimeout.current = setTimeout(async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: value,
            format: "json",
            addressdetails: 1,
            limit: 5,
            countrycodes: "in",
          },
        }
      )
      setSuggestions(res.data)
      setShowSuggestions(true)
    } catch (err) {
      console.log("Location search error:", err)
    }
  }, 400)
}

const handleSelectLocation = (place) => {
  setForm({ ...form, pickupLocation: place.display_name })
  setSuggestions([])
  setShowSuggestions(false)
}
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/book-car`,
        {
          vehicleId: car._id,
          pickupDate: form.pickupDate,
          returnDate: form.returnDate,
          pickupLocation: form.pickupLocation,
          message: form.message,
        },
        { withCredentials: true }
      )

      alert(res.data.message)
      localStorage.removeItem("selectedCar")
      window.location.href = "/user/bookings"
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] text-gray-950 overflow-x-hidden">
      <UserNavbar setOpen={setOpen} user={user} />
      <UserSidebar open={open} setOpen={setOpen} user={user} />

      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-12 lg:px-8">
        {/* Dynamic layout changes from single column on mobile to split view on desktop grids */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 items-start">
          
          {/* Vehicle Display Details Panel */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
            <img
              src={getImageUrl(car.image)}
              alt={car.vehicleName}
              className="h-48 sm:h-64 md:h-72 w-full object-cover"
            />

            <div className="p-5 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{car.vehicleName}</h1>
              <p className="mt-1 text-sm font-semibold text-gray-500">{car.brand?.brandName || "RentRide Fleet"}</p>
              <p className="mt-4 text-2xl sm:text-3xl font-black text-red-500">
                ₹{car.pricePerDay}<span className="text-xs sm:text-sm font-bold text-gray-500">/day</span>
              </p>
            </div>
          </div>

          {/* Form Processing Request Panel */}
          <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Booking Details</h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Submit your booking request to the admin panel.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-5">
              <Field icon={<Calendar size={18} />} label="Pickup Date">
                <Input
                  type="date"
                  name="pickupDate"
                  value={form.pickupDate}
                  onChange={handleChange}
                  className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900 min-h-[46px]"
                  required
                />
              </Field>

              <Field icon={<Calendar size={18} />} label="Return Date">
                <Input
                  type="date"
                  name="returnDate"
                  value={form.returnDate}
                  onChange={handleChange}
                  className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900 min-h-[46px]"
                  required
                />
              </Field>

              <div className="relative w-full">
  <Field icon={<MapPin size={18} />} label="Pickup Location">
    <Input
      name="pickupLocation"
      value={form.pickupLocation}
      onChange={(e) => handleLocationSearch(e.target.value)}
      onFocus={() => form.pickupLocation.length >= 3 && setShowSuggestions(true)}
      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      placeholder="Enter pickup location"
      className="border-0 focus-visible:ring-0 text-sm sm:text-base py-2.5 sm:py-3 h-auto shadow-none text-gray-900 placeholder:text-gray-400"
      autoComplete="off"
      required
    />
  </Field>

  {showSuggestions && suggestions.length > 0 && (
    <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
      {suggestions.map((place, idx) => (
        <button
          type="button"
          key={idx}
          onClick={() => handleSelectLocation(place)}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 border-b border-gray-50 last:border-0 transition-colors"
        >
          {place.display_name}
        </button>
      ))}
    </div>
  )}
</div>

              <div>
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-gray-800">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-xl border bg-white p-4 outline-none text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all"
                  placeholder="Any special requests or instructions?"
                />
              </div>

              <Button className="w-full rounded-xl bg-red-500 py-5 sm:py-6 text-base sm:text-lg hover:bg-red-600 font-bold transition-all mt-2">
                Submit Booking Request
              </Button>
            </form>
          </div>
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