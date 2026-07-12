import { useState } from "react"
import axios from "axios"
import { BadgePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function AddBrand() {
  const admin = JSON.parse(localStorage.getItem("admin"))
  const [brandName, setBrandName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/add-brand`,
        { brandName },
        { withCredentials: true }
      )

      alert(res.data.message)
      setBrandName("")
    } catch (err) {
      alert(err.response?.data?.message || "Brand add failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <AdminSidebar admin={admin} />

      <main className="lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        {/* Content container optimized to center on larger screens and adapt to mobile devices */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-5 sm:p-8 shadow-xl border border-slate-100">
            <div className="mb-6 sm:mb-8 text-center">
              <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-100">
                <BadgePlus className="text-red-500" size={32} />
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight">Add Brand</h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                Add a new vehicle brand for RentRide.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">
                  Brand Name
                </label>
                <Input
                  placeholder="Enter brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="rounded-xl border bg-white px-4 py-2.5 sm:py-3 h-auto text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:border-red-400 focus-visible:ring-offset-0 text-slate-900 placeholder:text-gray-400"
                  required
                />
              </div>

              <Button className="w-full rounded-xl bg-red-500 py-5 sm:py-6 text-base sm:text-lg font-bold hover:bg-red-600 transition-all mt-2 h-auto">
                Add Brand
              </Button>

              <a
                href="/admin/manage-brands"
                className="block text-center text-xs sm:text-sm font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors pt-1"
              >
                View All Brands
              </a>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}