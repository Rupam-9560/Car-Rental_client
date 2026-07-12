import { useEffect, useState } from "react"
import axios from "axios"
import UserNavbar from "@/components/UserNavbar"
import UserSidebar from "@/components/UserSidebar"

export default function TicketHistory() {
  const [open, setOpen] = useState(false)
  const [tickets, setTickets] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/ticket-history`, {
        withCredentials: true,
      })

      setTickets(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  if (!user) {
    window.location.href = "/login"
    return null
  }

  return (
    <div className="min-h-screen bg-[#fff7f0] text-gray-950 overflow-x-hidden">
      <UserNavbar setOpen={setOpen} user={user} />
      <UserSidebar open={open} setOpen={setOpen} user={user} />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-xl border border-gray-100">
          <div className="border-b border-gray-100 pb-4 sm:pb-6">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ticket History
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Track the status of your support queries and requests.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5">
            {tickets.map((ticket) => (
              <div 
                key={ticket._id} 
                className="rounded-2xl border border-gray-200 p-4 sm:p-5 transition hover:shadow-md bg-white"
              >
                {/* Responsive header layout - switches columns on extra small viewports */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-snug break-words max-w-xl">
                    {ticket.subject}
                  </h3>
                  <span className="w-max rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 capitalize flex-shrink-0">
                    {ticket.status}
                  </span>
                </div>

                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed break-words">
                  {ticket.message}
                </p>

                <div className="mt-4 sm:mt-5 rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <h4 className="text-sm font-black text-gray-900">
                    Admin Reply
                  </h4>
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed break-words">
                    {ticket.adminReply || "No reply yet"}
                  </p>
                </div>
              </div>
            ))}

            {tickets.length === 0 && (
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl bg-[#fffaf5]">
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  No support tickets found.
                </p>
                <a 
                  href="/user/generate-ticket" 
                  className="mt-3 inline-block text-xs sm:text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  Need help? Generate a ticket
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}