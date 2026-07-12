import { useState } from "react"
import axios from "axios"
import {
  LayoutDashboard,
  BadgePlus,
  Car,
  CalendarCheck,
  MessageCircle,
  Users,
  FileText,
  Phone,
  KeyRound,
  LogOut,
  PlusCircle,
  List,
  TicketCheck,
  Menu,
  X,
} from "lucide-react"

export default function AdminSidebar({ admin }) {
  const [open, setOpen] = useState(false)

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {
        withCredentials: true,
      })
    } catch (err) {
      console.log(err)
    }

    localStorage.removeItem("admin")
    window.location.href = "/"
  }

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-white px-5 py-4 lg:hidden">
        <h1 className="text-2xl font-black text-gray-900">
          Rent<span className="text-red-500">Ride</span>
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border p-2 text-gray-900"
        >
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          bg-[#111827] text-white transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <h1 className="text-3xl font-black">
              Rent<span className="text-red-500">Ride</span>
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Admin Control Panel
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 hover:bg-white/10 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mx-5 mt-5 rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-gray-400">Logged in as</p>
          <h3 className="font-black">{admin?.name || "Admin"}</h3>
          <p className="break-all text-sm text-gray-400">{admin?.email}</p>
        </div>

        <nav className="mt-5 flex-1 space-y-2 overflow-y-auto px-4 pb-4">
          <SideLink href="/admin/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />

          <MenuGroup icon={<BadgePlus size={18} />} title="Brands">
            <SideSubLink href="/admin/add-brand" icon={<PlusCircle size={16} />} text="Add Brands" />
            <SideSubLink href="/admin/manage-brands" icon={<List size={16} />} text="Manage Brand" />
          </MenuGroup>

          <MenuGroup icon={<Car size={18} />} title="Vehicles">
            <SideSubLink href="/admin/post-vehicle" icon={<PlusCircle size={16} />} text="Post a Vehicle" />
            <SideSubLink href="/admin/manage-vehicles" icon={<List size={16} />} text="Manage Vehicle" />
          </MenuGroup>

          <SideLink href="/admin/manage-bookings" icon={<CalendarCheck size={18} />} text="Manage Bookings" />
          <SideLink href="/admin/manage-testimonials" icon={<MessageCircle size={18} />} text="Manage Testimonials" />
          <SideLink href="/admin/manage-tickets" icon={<TicketCheck size={18} />} text="Manage Tickets" />
          <SideLink href="/admin/registered-users" icon={<Users size={18} />} text="Reg Users" />
          <SideLink href="/admin/manage-pages" icon={<FileText size={18} />} text="Manage Pages" />
          <SideLink href="/admin/update-contact-info" icon={<Phone size={18} />} text="Update Contact Info" />
          <SideLink href="/admin/update-password" icon={<KeyRound size={18} />} text="Update Password" />
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-bold text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

function SideLink({ href, icon, text }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
    >
      {icon}
      {text}
    </a>
  )
}

function MenuGroup({ icon, title, children }) {
  return (
    <div className="rounded-xl">
      <div className="flex items-center gap-3 px-4 py-3 font-semibold text-gray-300">
        {icon}
        {title}
      </div>

      <div className="ml-7 flex flex-col gap-1 border-l border-white/10 pl-3">
        {children}
      </div>
    </div>
  )
}

function SideSubLink({ href, icon, text }) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-400 transition hover:bg-white/10 hover:text-white"
    >
      {icon}
      {text}
    </a>
  )
}