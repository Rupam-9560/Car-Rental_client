import { useEffect, useState } from "react"
import axios from "axios"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"
import { CheckCircle, XCircle, Trash2, Star } from "lucide-react"

export default function ManageTestimonials() {
  const admin = JSON.parse(localStorage.getItem("admin"))

  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/manage-testimonials`,
        {
          withCredentials: true,
        }
      )

      setTestimonials(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/testimonial-status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      )

      alert(res.data.message)

      fetchTestimonials()
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Status update failed"
      )
    }
  }

  const deleteTestimonial = async (id) => {
    if (
      !window.confirm(
        "Delete this testimonial?"
      )
    )
      return

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/admin/delete-testimonial/${id}`,
        {
          withCredentials: true,
        }
      )

      fetchTestimonials()
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Delete failed"
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <AdminSidebar admin={admin} />

      <main className="lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="rounded-3xl bg-white p-4 sm:p-8 shadow-xl border border-slate-100">

            {/* Header layout adjusts context across layout boundaries */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 sm:pb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Manage Testimonials
                </h1>

                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Approve, reject or delete client testimonials.
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 px-4 py-2 sm:px-5 sm:py-3 text-center w-full sm:w-auto flex-shrink-0">
                <span className="text-sm font-bold text-red-600">
                  Total: {testimonials.length}
                </span>
              </div>
            </div>

            {/* Desktop Table Layout (Visible on tablets and monitors) */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-slate-50 text-slate-700 text-sm">
                    <th className="p-4 text-left font-black">User</th>
                    <th className="p-4 text-left font-black">Rating</th>
                    <th className="p-4 text-left font-black">Message</th>
                    <th className="p-4 text-left font-black">Status</th>
                    <th className="p-4 text-left font-black">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-600">
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        <h3 className="font-bold text-slate-900">
                          {testimonial.user?.name || "RentRide User"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {testimonial.user?.email}
                        </p>
                      </td>

                      <td className="p-4">
                        <div className="flex">
                          {[...Array(Number(testimonial.rating) || 5)].map((_, index) => (
                            <Star
                              key={index}
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </td>

                      <td className="max-w-md p-4 break-words leading-relaxed">
                        {testimonial.message}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold capitalize ${
                            testimonial.status === "approved"
                              ? "bg-green-50 text-green-700"
                              : testimonial.status === "rejected"
                              ? "bg-red-50 text-red-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {testimonial.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-1.5">
                          {testimonial.status === "pending" && (
                            <>
                              <button
                                onClick={() => updateStatus(testimonial._id, "approved")}
                                className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600 transition-colors"
                              >
                                <CheckCircle size={16} />
                              </button>

                              <button
                                onClick={() => updateStatus(testimonial._id, "rejected")}
                                className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 transition-colors"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => deleteTestimonial(testimonial._id)}
                            className="rounded-lg bg-slate-800 p-2 text-white hover:bg-slate-950 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {testimonials.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-12 text-center text-gray-400 font-medium">
                        No testimonials found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Grid Layout (Visible on small screen scales only) */}
            <div className="grid gap-4 md:hidden">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial._id} 
                  className="rounded-2xl border border-slate-200 p-4 bg-white shadow-sm flex flex-col gap-3.5 text-xs"
                >
                  <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-2.5">
                    <div className="min-w-0">
                      <h3 className="font-black text-sm text-slate-900 truncate">
                        {testimonial.user?.name || "RentRide User"}
                      </h3>
                      <p className="text-slate-400 break-all mt-0.5">{testimonial.user?.email}</p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 font-bold capitalize flex-shrink-0 scale-90 origin-top-right ${
                        testimonial.status === "approved"
                          ? "bg-green-50 text-green-700"
                          : testimonial.status === "rejected"
                          ? "bg-red-50 text-red-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {testimonial.status}
                    </span>
                  </div>

                  <div>
                    <div className="flex mb-1.5">
                      {[...Array(Number(testimonial.rating) || 5)].map((_, index) => (
                        <Star
                          key={index}
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed break-words whitespace-pre-line">
                      {testimonial.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                    {testimonial.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(testimonial._id, "approved")}
                          className="flex items-center gap-1 rounded-xl bg-green-500 px-3 py-2 font-bold text-white hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle size={14} /> Approve
                        </button>

                        <button
                          onClick={() => updateStatus(testimonial._id, "rejected")}
                          className="flex items-center gap-1 rounded-xl bg-red-500 px-3 py-2 font-bold text-white hover:bg-red-600 transition-colors"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => deleteTestimonial(testimonial._id)}
                      className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-2 font-bold text-white hover:bg-slate-950 transition-colors"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}

              {testimonials.length === 0 && (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <p className="text-sm text-gray-500 font-medium">
                    No testimonials found.
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