import axios from "axios"
import {
  X,
  LayoutDashboard,
  Car,
  User,
  Star,
  MessageCircle,
  LogOut,
  KeyRound,
  LifeBuoy,
  History,
} from "lucide-react"

export default function UserSidebar({ open, setOpen, user }) {
  if (!open) return null

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {
        withCredentials: true,
      })
    } catch (err) {
      console.log(err)
    }

    localStorage.removeItem("user")
    localStorage.removeItem("selectedCar")
    window.location.href = "/"
  }

  const links = [
    ["/user/dashboard", LayoutDashboard, "Dashboard"],
    ["/user/dashboard#cars", Car, "Book Cars"],
    ["/user/bookings", Car, "My Bookings"],
    ["/user/profile", User, "Profile"],
    ["/user/update-password", KeyRound, "Update Password"],
    ["/user/add-testimonial", Star, "Add Testimonial"],
    ["/user/testimonials", MessageCircle, "See Testimonials"],
    ["/user/generate-ticket", LifeBuoy, "Generate Ticket"],
    ["/user/ticket-history", History, "Ticket History"],
  ]

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
      <aside className="flex h-full w-[82vw] max-w-[340px] flex-col overflow-y-auto bg-white shadow-2xl sm:w-80">
        <div className="sticky top-0 z-10 border-b bg-white px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black sm:text-2xl">
              Rent<span className="text-red-500">Ride</span>
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="px-4 pt-5 sm:px-6 sm:pt-6">
          <div className="rounded-3xl bg-gradient-to-r from-red-50 to-orange-50 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Logged in as
            </p>

            <h3 className="mt-1 truncate text-base font-black text-red-600 sm:text-lg">
              {user?.name || "User"}
            </h3>

            <p className="mt-1 break-all text-xs text-gray-500 sm:text-sm">
              {user?.email}
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-3 py-5 sm:px-4 sm:py-6">
          {links.map(([href, Icon, label]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-red-50 hover:text-red-600 sm:px-4 sm:text-base"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-red-500">
                <Icon size={18} />
              </span>

              <span className="truncate">{label}</span>
            </a>
          ))}
        </nav>

        <div className="border-t bg-white p-3 sm:p-4">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 font-bold text-white hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </div>
  )
}