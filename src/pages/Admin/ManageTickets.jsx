import { useEffect, useState } from "react"
import axios from "axios"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"

export default function ManageTickets() {
  const admin = JSON.parse(localStorage.getItem("admin"))
  const [tickets, setTickets] = useState([])
  const [reply, setReply] = useState({})

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/tickets`, {
      withCredentials: true,
    })

    setTickets(res.data)
  }

  const sendReply = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/reply-ticket/${id}`,
        {
          adminReply: reply[id],
          status: "replied",
        },
        { withCredentials: true }
      )

      alert(res.data.message)
      setReply({ ...reply, [id]: "" })
      fetchTickets()
    } catch (err) {
      alert(err.response?.data?.message || "Reply failed")
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
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Manage Tickets</h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Reply to user support tickets and query logs.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6">
              {tickets.map((ticket) => (
                <div 
                  key={ticket._id} 
                  className="rounded-2xl border border-slate-200 p-4 sm:p-6 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Dynamic Header - Stacks elements on smaller screen sizes */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug break-words">
                        {ticket.subject}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
                        <span className="font-semibold text-slate-700">{ticket.user?.name}</span>
                        <span className="mx-1.5 text-slate-300">|</span>
                        {ticket.user?.email}
                      </p>
                    </div>

                    <span className="w-max rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 capitalize flex-shrink-0">
                      {ticket.status}
                    </span>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed break-words whitespace-pre-line">
                    {ticket.message}
                  </p>

                  {ticket.adminReply && (
                    <div className="mt-4 rounded-xl bg-green-50/70 p-4 border border-green-100">
                      <h4 className="text-sm font-black text-green-800">Your Reply</h4>
                      <p className="mt-1 text-sm text-slate-700 leading-relaxed break-words whitespace-pre-line">
                        {ticket.adminReply}
                      </p>
                    </div>
                  )}

                  <textarea
                    value={reply[ticket._id] || ""}
                    onChange={(e) =>
                      setReply({ ...reply, [ticket._id]: e.target.value })
                    }
                    rows="3"
                    className="mt-5 w-full rounded-xl border bg-white p-4 outline-none text-sm sm:text-base text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all"
                    placeholder="Write admin reply details..."
                  />

                  <Button
                    onClick={() => sendReply(ticket._id)}
                    className="mt-4 rounded-xl bg-red-500 py-4 font-bold text-white hover:bg-red-600 transition-colors w-full sm:w-auto px-6 h-auto text-sm sm:text-base"
                  >
                    Send Reply
                  </Button>
                </div>
              ))}

              {tickets.length === 0 && (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <p className="text-sm sm:text-base text-gray-500 font-medium">
                    No open support tickets found.
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