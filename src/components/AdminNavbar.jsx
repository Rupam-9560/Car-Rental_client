import { Bell, Shield } from "lucide-react"

export default function AdminNavbar({ admin }) {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            Control RentRide Platform
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <button className="rounded-xl border p-3 hover:bg-gray-50">
            <Bell size={20} />
          </button>

          <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-red-50 px-3 py-3 sm:px-4">
            <Shield size={20} className="shrink-0 text-red-500" />

            <span className="max-w-[140px] truncate text-sm font-bold text-red-600 sm:max-w-[200px]">
              {admin?.name || "Admin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}