import { useEffect, useState } from "react"
import axios from "axios"
import { Pencil, Trash2 } from "lucide-react"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function ManageVehicles() {
  const admin = JSON.parse(localStorage.getItem("admin"))
  const [vehicles, setVehicles] = useState([])

  const getImageUrl = (image) => {
    if (!image) return ""

    return image.startsWith("http")
      ? image
      : `${import.meta.env.VITE_BASE_URL}${image}`
  }

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/vehicles`,
        {
          withCredentials: true,
        }
      )

      setVehicles(res.data)
    } catch (err) {
      console.log(err)
      alert(
        err.response?.data?.message ||
          "Unable to fetch vehicles"
      )
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const deleteVehicle = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/admin/delete-vehicle/${id}`,
        {
          withCredentials: true,
        }
      )

      alert(res.data.message)
      fetchVehicles()
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Vehicle delete failed"
      )
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <AdminSidebar admin={admin} />

      <main className="flex min-h-screen flex-col lg:ml-72">
        <AdminNavbar admin={admin} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-xl sm:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:pb-6">
              <div>
                <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                  Manage Vehicles
                </h1>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Edit or delete RentRide vehicles ({vehicles.length} total).
                </p>
              </div>

              <a
                href="/admin/post-vehicle"
                className="w-full rounded-xl bg-red-500 px-5 py-3 text-center text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-600 sm:w-auto"
              >
                Post Vehicle
              </a>
            </div>

            <div className="hidden overflow-x-auto rounded-xl border border-slate-100 md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-slate-50 text-sm text-slate-700">
                    <th className="p-4 text-left font-black">Image</th>
                    <th className="p-4 text-left font-black">Vehicle</th>
                    <th className="p-4 text-left font-black">Brand</th>
                    <th className="p-4 text-left font-black">Price</th>
                    <th className="p-4 text-left font-black">Status</th>
                    <th className="p-4 text-left font-black">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-600">
                  {vehicles.map((vehicle) => (
                    <tr
                      key={vehicle._id}
                      className="transition-colors hover:bg-slate-50/50"
                    >
                      <td className="p-4">
                        <img
                          src={getImageUrl(vehicle.image)}
                          alt={vehicle.vehicleName}
                          className="h-14 w-20 rounded-xl border object-cover"
                        />
                      </td>

                      <td className="p-4 font-bold text-slate-900">
                        {vehicle.vehicleName}
                      </td>

                      <td className="p-4">
                        {vehicle.brand?.brandName || "-"}
                      </td>

                      <td className="p-4 font-semibold text-slate-900">
                        ₹{vehicle.pricePerDay}/day
                      </td>

                      <td className="p-4 capitalize">
                        <span
                          className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold ${
                            vehicle.status === "available"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <a
                            href={`/admin/edit-vehicle/${vehicle._id}`}
                            className="rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                          >
                            <Pencil size={16} />
                          </a>

                          <button
                            onClick={() =>
                              deleteVehicle(vehicle._id)
                            }
                            className="rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {vehicles.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-12 text-center font-medium text-gray-400"
                      >
                        No vehicles found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:hidden">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle._id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-xs shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageUrl(vehicle.image)}
                      alt={vehicle.vehicleName}
                      className="h-16 w-24 flex-shrink-0 rounded-xl border object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-black text-slate-900">
                        {vehicle.vehicleName}
                      </h3>

                      <p className="mt-0.5 font-medium text-slate-400">
                        {vehicle.brand?.brandName || "-"}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`origin-left scale-90 rounded-full px-2.5 py-0.5 font-bold capitalize ${
                            vehicle.status === "available"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Price
                      </p>

                      <p className="mt-0.5 text-sm font-black text-slate-900">
                        ₹{vehicle.pricePerDay}/day
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={`/admin/edit-vehicle/${vehicle._id}`}
                        className="rounded-xl bg-blue-500 p-2.5 text-white transition-colors hover:bg-blue-600"
                      >
                        <Pencil size={16} />
                      </a>

                      <button
                        onClick={() =>
                          deleteVehicle(vehicle._id)
                        }
                        className="rounded-xl bg-red-500 p-2.5 text-white transition-colors hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {vehicles.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
                  <p className="text-sm font-medium text-gray-500">
                    No vehicles found.
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