import { useEffect, useState } from "react"
import axios from "axios"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function ManageBookings() {
  const admin = JSON.parse(localStorage.getItem("admin"))
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/manage-bookings`, {
        withCredentials: true,
      })

      setBookings(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/booking-status/${id}`,
        { status },
        { withCredentials: true }
      )

      alert(res.data.message)
      fetchBookings()
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <AdminSidebar admin={admin} />

      <main className="lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="rounded-3xl bg-white p-4 sm:p-8 shadow-xl border border-slate-100">
            <div className="border-b border-slate-100 pb-4 sm:pb-6">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Manage Bookings</h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Confirm or cancel user booking requests across the platform.
              </p>
            </div>

            {/* Desktop Table View (Visible on tablets and larger monitors) */}
            <div className="mt-6 hidden xl:block overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-slate-50 text-slate-700 text-sm">
                    <th className="p-4 text-left font-black">User</th>
                    <th className="p-4 text-left font-black">Car</th>
                    <th className="p-4 text-left font-black">Pickup</th>
                    <th className="p-4 text-left font-black">Return</th>
                    <th className="p-4 text-left font-black">Location</th>
                    <th className="p-4 text-left font-black">Status</th>
                    <th className="p-4 text-left font-black">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-600">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{booking.user?.name}</p>
                        <p className="text-xs text-gray-500 break-all">{booking.user?.email}</p>
                      </td>

                      <td className="p-4 font-bold text-slate-900">
                        {booking.vehicle?.vehicleName}
                      </td>

                      <td className="p-4 whitespace-nowrap">{booking.pickupDate}</td>
                      <td className="p-4 whitespace-nowrap">{booking.returnDate}</td>
                      <td className="p-4 break-words max-w-xs">{booking.pickupLocation}</td>

                      <td className="p-4">
                        <span
                          className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold capitalize ${
                            booking.status === "confirmed"
                              ? "bg-green-50 text-green-700"
                              : booking.status === "cancelled"
                              ? "bg-red-50 text-red-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="p-4">
                        {booking.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(booking._id, "confirmed")}
                              className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-600 transition-colors"
                            >
                              Confirm
                            </button>

                            <button
                              onClick={() => updateStatus(booking._id, "cancelled")}
                              className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-gray-400">No action</span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-12 text-center text-gray-400 font-medium">
                        No bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile & Tablet Card Grid Layout (Visible under xl screens) */}
            <div className="mt-4 grid gap-4 xl:hidden sm:grid-cols-2">
              {bookings.map((booking) => (
                <div 
                  key={booking._id} 
                  className="rounded-2xl border border-slate-200 p-4 bg-white shadow-sm flex flex-col justify-between gap-3.5 text-xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-2">
                      <div className="min-w-0">
                        <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Rider</p>
                        <p className="font-black text-sm text-slate-900 truncate">{booking.user?.name || "Unknown"}</p>
                        <p className="text-slate-400 truncate mt-0.5">{booking.user?.email}</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-bold capitalize flex-shrink-0 scale-90 origin-top-right ${
                          booking.status === "confirmed"
                            ? "bg-green-50 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-50 text-red-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-3">
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Vehicle Choice</p>
                      <p className="font-bold text-slate-800 text-sm mt-0.5">{booking.vehicle?.vehicleName || "-"}</p>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-b border-slate-100 py-2">
                      <div>
                        <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Pickup Date</p>
                        <p className="font-medium text-slate-700 mt-0.5">{booking.pickupDate}</p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Return Date</p>
                        <p className="font-medium text-slate-700 mt-0.5">{booking.returnDate}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Route Hub Location</p>
                      <p className="font-medium text-slate-700 mt-0.5 break-words">{booking.pickupLocation}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex justify-end items-center min-h-[40px]">
                    {booking.status === "pending" ? (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => updateStatus(booking._id, "confirmed")}
                          className="flex-1 sm:flex-initial rounded-xl bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 transition-colors text-center"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, "cancelled")}
                          className="flex-1 sm:flex-initial rounded-xl bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 transition-colors text-center"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-semibold italic text-right w-full">Processed</span>
                    )}
                  </div>
                </div>
              ))}

              {bookings.length === 0 && (
                <div className="sm:col-span-2 text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <p className="text-sm text-gray-500 font-medium">
                    No bookings found.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}