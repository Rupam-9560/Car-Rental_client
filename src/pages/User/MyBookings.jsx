import { useEffect, useState } from "react"
import axios from "axios"
import UserNavbar from "@/components/UserNavbar"
import UserSidebar from "@/components/UserSidebar"

export default function MyBookings() {
  const [open, setOpen] = useState(false)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const user = JSON.parse(localStorage.getItem("user"))

  const getImageUrl = (image) => {
    if (!image) {
      return "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900"
    }

    return image.startsWith("http")
      ? image
      : `${import.meta.env.VITE_BASE_URL}${image}`
  }

  const formatDate = (date) => {
    if (!date) return "-"

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const fetchBookings = async () => {
    try {
      setLoading(true)

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/my-bookings`,
        {
          withCredentials: true,
        }
      )

      setBookings(res.data || [])
    } catch (err) {
      console.log("FETCH BOOKINGS ERROR:", err)

      if (err.response?.status === 401) {
        localStorage.removeItem("user")
        window.location.href = "/login"
        return
      }

      alert(
        err.response?.data?.message ||
        "Bookings load nahi ho paayi"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  if (!user) {
    window.location.href = "/login"
    return null
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffaf5] text-gray-950">
      <UserNavbar
        setOpen={setOpen}
        user={user}
      />

      <UserSidebar
        open={open}
        setOpen={setOpen}
        user={user}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xl sm:p-8">
          <div className="border-b border-gray-100 pb-4 sm:pb-6">
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              My Bookings
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Track your booking requests and status.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />

                <p className="mt-4 text-sm font-semibold text-gray-500">
                  Loading bookings...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-6 hidden overflow-x-auto rounded-xl border border-gray-100 md:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-slate-50 text-sm text-slate-700">
                      <th className="p-4 text-left font-black">
                        Car
                      </th>

                      <th className="p-4 text-left font-black">
                        Pickup
                      </th>

                      <th className="p-4 text-left font-black">
                        Return
                      </th>

                      <th className="p-4 text-left font-black">
                        Location
                      </th>

                      <th className="p-4 text-left font-black">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 bg-white text-sm">
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="transition-colors hover:bg-slate-50/50"
                      >
                        <td className="p-4">
                          <div className="flex min-w-52 items-center gap-3">
                            <img
                              src={getImageUrl(
                                booking.vehicle?.image
                              )}
                              alt={
                                booking.vehicle?.vehicleName ||
                                "Vehicle"
                              }
                              className="h-14 w-20 rounded-xl border object-cover"
                              loading="lazy"
                            />

                            <div>
                              <p className="font-bold text-gray-900">
                                {booking.vehicle?.vehicleName ||
                                  "Vehicle unavailable"}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-500">
                                {booking.vehicle?.brand?.brandName ||
                                  "RentRide"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 text-gray-600">
                          {formatDate(booking.pickupDate)}
                        </td>

                        <td className="p-4 text-gray-600">
                          {formatDate(booking.returnDate)}
                        </td>

                        <td className="max-w-xs break-words p-4 text-gray-600">
                          {booking.pickupLocation || "-"}
                        </td>

                        <td className="p-4">
                          <StatusBadge
                            status={booking.status}
                          />
                        </td>
                      </tr>
                    ))}

                    {bookings.length === 0 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="p-12 text-center font-medium text-gray-500"
                        >
                          No bookings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid gap-4 md:hidden">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={getImageUrl(
                          booking.vehicle?.image
                        )}
                        alt={
                          booking.vehicle?.vehicleName ||
                          "Vehicle"
                        }
                        className="h-20 w-28 flex-shrink-0 rounded-xl border object-cover"
                        loading="lazy"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words text-base font-black text-gray-900">
                          {booking.vehicle?.vehicleName ||
                            "Vehicle unavailable"}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-gray-500">
                          {booking.vehicle?.brand?.brandName ||
                            "RentRide"}
                        </p>

                        <div className="mt-2">
                          <StatusBadge
                            status={booking.status}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 border-y border-gray-100 py-3 text-xs">
                      <div>
                        <p className="font-bold uppercase tracking-wider text-gray-400">
                          Pickup
                        </p>

                        <p className="mt-0.5 font-medium text-gray-700">
                          {formatDate(booking.pickupDate)}
                        </p>
                      </div>

                      <div>
                        <p className="font-bold uppercase tracking-wider text-gray-400">
                          Return
                        </p>

                        <p className="mt-0.5 font-medium text-gray-700">
                          {formatDate(booking.returnDate)}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs">
                      <p className="font-bold uppercase tracking-wider text-gray-400">
                        Location
                      </p>

                      <p className="mt-0.5 break-words text-gray-700">
                        {booking.pickupLocation || "-"}
                      </p>
                    </div>
                  </div>
                ))}

                {bookings.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-gray-200 bg-[#fffaf5] py-12 text-center">
                    <p className="text-sm font-medium text-gray-500">
                      No bookings found.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${
        status === "confirmed"
          ? "bg-green-100 text-green-700"
          : status === "cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status || "pending"}
    </span>
  )
}