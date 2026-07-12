import { useEffect, useState } from "react"
import axios from "axios"
import {
  Car,
  Users,
  CalendarCheck,
  Clock,
  PlusCircle,
  BadgePlus,
  TrendingUp,
  MessageCircle,
  FileText,
  Phone,
  KeyRound,
  TicketCheck,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/dashboard`,
          {
            withCredentials: true,
          }
        )

        setAdmin(res.data.admin)
        setStats(res.data.stats)

        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.admin)
        )
      } catch (err) {
        console.log(
          "ADMIN DASHBOARD ERROR:",
          err.response?.data || err.message
        )

        localStorage.removeItem("admin")
        window.location.href = "/admin/login"
      } finally {
        setLoading(false)
      }
    }

    checkAdmin()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />

          <h1 className="mt-5 text-xl font-black text-gray-900 sm:text-2xl">
            Checking admin login...
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Loading RentRide control panel
          </p>
        </div>
      </div>
    )
  }

  if (!admin) return null

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <AdminSidebar admin={admin} />

      <main className="min-w-0 lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        <section className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8">

          {/* HERO - Configured with fluid responsive text and stackable buttons */}
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#991b1b] p-5 text-white shadow-xl sm:rounded-3xl sm:p-7 lg:rounded-[2rem] lg:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

              <div className="min-w-0">
                <p className="text-xs font-semibold text-white/70 sm:text-sm uppercase tracking-wider">
                  Welcome back
                </p>

                <h2 className="mt-1 break-words text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  Hello, {admin?.name || "Admin"}
                </h2>

                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-white/75 sm:text-sm sm:leading-6">
                  Manage brands, vehicles, bookings, testimonials,
                  support tickets, users and website content from one
                  powerful admin panel.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:w-auto lg:w-auto flex-shrink-0">
                <a
                  href="/admin/post-vehicle"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full gap-2 bg-white text-gray-900 hover:bg-gray-100 font-bold">
                    <PlusCircle size={18} />
                    Post Vehicle
                  </Button>
                </a>

                <a
                  href="/admin/manage-vehicles"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full gap-2 bg-red-500 hover:bg-red-600 font-bold">
                    <Car size={18} />
                    View Vehicles
                  </Button>
                </a>
              </div>

            </div>
          </div>


          {/* PRIMARY STATS - Adapts from single column up to 4 columns */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card
              icon={<Car size={22} />}
              title="Vehicles"
              value={stats?.totalCars ?? 0}
            />

            <Card
              icon={<BadgePlus size={22} />}
              title="Brands"
              value={stats?.totalBrands ?? 0}
            />

            <Card
              icon={<Users size={22} />}
              title="Reg Users"
              value={stats?.totalUsers ?? 0}
            />

            <Card
              icon={<Clock size={22} />}
              title="Pending Bookings"
              value={stats?.pendingBookings ?? 0}
            />
          </div>


          {/* SECONDARY STATS - Adapts from single column up to 3 columns */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Card
              icon={<CalendarCheck size={22} />}
              title="Total Bookings"
              value={stats?.totalBookings ?? 0}
            />

            <Card
              icon={<MessageCircle size={22} />}
              title="Testimonials"
              value={stats?.totalTestimonials ?? 0}
            />

            <Card
              icon={<FileText size={22} />}
              title="Pages"
              value={stats?.totalPages ?? 0}
            />
          </div>


          {/* ADMIN CONTROLS + HEALTH */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3 items-start">

            {/* CONTROLS HUB */}
            <div className="min-w-0 rounded-2xl bg-white p-4 shadow-md border border-slate-100 sm:rounded-3xl sm:p-6 xl:col-span-2">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Admin Controls
                </h3>

                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  Quick access to important admin actions.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <Action
                  href="/admin/add-brand"
                  icon={<BadgePlus size={18} />}
                  title="Add Brand"
                  text="Create a new vehicle brand."
                />

                <Action
                  href="/admin/manage-brands"
                  icon={<BadgePlus size={18} />}
                  title="Manage Brands"
                  text="Edit or remove vehicle brands."
                />

                <Action
                  href="/admin/post-vehicle"
                  icon={<PlusCircle size={18} />}
                  title="Post Vehicle"
                  text="Add a vehicle with images and details."
                />

                <Action
                  href="/admin/manage-vehicles"
                  icon={<Car size={18} />}
                  title="Manage Vehicles"
                  text="Edit or remove vehicle information."
                />

                <Action
                  href="/admin/manage-bookings"
                  icon={<CalendarCheck size={18} />}
                  title="Manage Bookings"
                  text="Confirm or cancel booking requests."
                />

                <Action
                  href="/admin/manage-testimonials"
                  icon={<MessageCircle size={18} />}
                  title="Manage Testimonials"
                  text="Review and approve customer testimonials."
                />

                <Action
                  href="/admin/manage-tickets"
                  icon={<TicketCheck size={18} />}
                  title="Manage Tickets"
                  text="View user support requests and send replies."
                />

                <Action
                  href="/admin/registered-users"
                  icon={<Users size={18} />}
                  title="Reg Users"
                  text="View all registered users."
                />

                <Action
                  href="/admin/manage-pages"
                  icon={<FileText size={18} />}
                  title="Manage Pages"
                  text="Update Terms, Privacy and policy pages."
                />

                <Action
                  href="/admin/update-contact-info"
                  icon={<Phone size={18} />}
                  title="Update Contact Info"
                  text="Update phone, email and support details."
                />

                <Action
                  href="/admin/update-password"
                  icon={<KeyRound size={18} />}
                  title="Update Password"
                  text="Change your admin password securely."
                />

              </div>
            </div>


            {/* PLATFORM HEALTH STATUS PANEL */}
            <div className="min-w-0 rounded-2xl bg-white p-4 shadow-md border border-slate-100 sm:rounded-3xl sm:p-6">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Platform Health
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                Current RentRide summary.
              </p>

              <div className="mt-5 space-y-2.5">
                <Health
                  title="Vehicle Availability"
                  value={
                    (stats?.totalCars ?? 0) > 0
                      ? "Good"
                      : "Empty"
                  }
                />

                <Health
                  title="Booking Flow"
                  value={
                    (stats?.totalBookings ?? 0) > 0
                      ? "Active"
                      : "Waiting"
                  }
                />

                <Health
                  title="User Activity"
                  value={
                    (stats?.totalUsers ?? 0) > 0
                      ? "Active"
                      : "Waiting"
                  }
                />

                <Health
                  title="Content Pages"
                  value={
                    (stats?.totalPages ?? 0) > 0
                      ? "Ready"
                      : "Setup"
                  }
                />
              </div>
            </div>

          </div>


          {/* RECENT BOOKING METRIC WRAPPER */}
          <div className="mt-6 min-w-0 rounded-2xl bg-white p-4 shadow-md border border-slate-100 sm:rounded-3xl sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Booking Overview
                </h3>

                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  Check booking activity and pending requests.
                </p>
              </div>

              <a
                href="/admin/manage-bookings"
                className="w-full sm:w-auto flex-shrink-0"
              >
                <Button
                  variant="outline"
                  className="w-full gap-2 sm:w-auto h-auto py-2.5 text-xs sm:text-sm font-bold border-slate-200"
                >
                  View All
                  <ArrowRight size={16} />
                </Button>
              </a>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <BookingSummary
                title="Total Bookings"
                value={stats?.totalBookings ?? 0}
                text="All booking requests received"
                icon={<CalendarCheck size={22} />}
              />

              <BookingSummary
                title="Pending Requests"
                value={stats?.pendingBookings ?? 0}
                text="Bookings waiting for admin action"
                icon={<Clock size={22} />}
              />
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}


function Card({ icon, title, value }) {
  return (
    <div className="group min-w-0 rounded-2xl bg-white p-5 shadow-sm border border-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-6">
      <div className="flex items-center justify-between gap-4">

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xs font-semibold text-gray-500 sm:text-sm">
            {title}
          </h3>

          <p className="mt-1 text-2xl font-black sm:text-3xl tracking-tight text-slate-900">
            {value ?? 0}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl">
          {icon}
        </div>

      </div>
    </div>
  )
}


function Action({ href, icon, title, text }) {
  return (
    <a
      href={href}
      className="group flex min-w-0 items-start gap-3.5 rounded-2xl border border-slate-100 p-4 bg-white transition duration-300 hover:border-red-200 hover:bg-red-50/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition duration-300 group-hover:bg-red-500 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-red-600 transition-colors">
          {title}
        </h4>

        <p className="mt-0.5 text-xs text-gray-500 leading-normal line-clamp-2">
          {text}
        </p>
      </div>
    </a>
  )
}


function Health({ title, value }) {
  return (
    <div className="flex flex-row items-center justify-between gap-3 rounded-xl bg-slate-50 border border-slate-100 p-3">
      <span className="text-xs sm:text-sm font-bold text-slate-700">
        {title}
      </span>

      <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-bold text-green-700 border border-green-200">
        <TrendingUp size={12} className="flex-shrink-0" />
        {value}
      </span>
    </div>
  )
}


function BookingSummary({ title, value, text, icon }) {
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 border border-red-100 sm:h-12 sm:w-12 sm:rounded-2xl">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-gray-500 sm:text-sm">
          {title}
        </p>

        <p className="mt-0.5 text-xl font-black sm:text-2xl tracking-tight text-slate-900">
          {value}
        </p>

        <p className="mt-0.5 text-[11px] sm:text-xs text-gray-400 truncate">
          {text}
        </p>
      </div>
    </div>
  )
}