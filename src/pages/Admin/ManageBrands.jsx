import { useEffect, useState } from "react"
import axios from "axios"
import { Pencil, Trash2, Save, X } from "lucide-react"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function ManageBrands() {
  const admin = JSON.parse(localStorage.getItem("admin"))
  const [brands, setBrands] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState("")

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/brands`, {
        withCredentials: true,
      })

      setBrands(res.data)
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch brands")
    }
  }

  useEffect(() => {
    fetchBrands()
  }, [])

  const startEdit = (brand) => {
    setEditingId(brand._id)
    setEditName(brand.brandName)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName("")
  }

  const updateBrand = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/update-brand/${editingId}`,
        { brandName: editName },
        { withCredentials: true }
      )

      setEditingId(null)
      setEditName("")
      fetchBrands()
    } catch (err) {
      alert(err.response?.data?.message || "Brand update failed")
    }
  }

  const deleteBrand = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/delete-brand/${id}`, {
        withCredentials: true,
      })

      fetchBrands()
    } catch (err) {
      alert(err.response?.data?.message || "Brand delete failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <AdminSidebar admin={admin} />

      <main className="lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="rounded-3xl bg-white p-4 sm:p-8 shadow-xl border border-slate-100">
            
            {/* Header section designed to flex vertically on mobile device scales */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 sm:pb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Manage Brands</h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Edit or delete vehicle brands ({brands.length} total).
                </p>
              </div>

              <a
                href="/admin/add-brand"
                className="rounded-xl bg-red-500 px-5 py-3 text-center text-sm font-bold text-white hover:bg-red-600 transition-colors shadow-sm w-full sm:w-auto"
              >
                Add Brand
              </a>
            </div>

            {/* Desktop Table View (Hidden on mobile displays) */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-slate-50 text-slate-700 text-sm">
                    <th className="p-4 font-black w-20">S.No</th>
                    <th className="p-4 font-black">Brand Name</th>
                    <th className="p-4 font-black w-48">Created At</th>
                    <th className="p-4 font-black w-36">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-600">
                  {brands.length > 0 ? (
                    brands.map((brand, index) => (
                      <tr key={brand._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-semibold text-slate-400">{index + 1}</td>

                        <td className="p-4">
                          {editingId === brand._id ? (
                            <input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full rounded-xl border bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all"
                            />
                          ) : (
                            <span className="font-bold text-slate-900">{brand.brandName}</span>
                          )}
                        </td>

                        <td className="p-4 text-slate-500 whitespace-nowrap">
                          {new Date(brand.createdAt).toLocaleDateString()}
                        </td>

                        <td className="p-4">
                          {editingId === brand._id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={updateBrand}
                                className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600 transition-colors"
                              >
                                <Save size={16} />
                              </button>

                              <button
                                onClick={cancelEdit}
                                className="rounded-lg bg-gray-500 p-2 text-white hover:bg-gray-600 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEdit(brand)}
                                className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors"
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                onClick={() => deleteBrand(brand._id)}
                                className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-12 text-center font-medium text-slate-400">
                        No brands found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Grid Card View (Visible on mobile screen viewports only) */}
            <div className="grid gap-4 md:hidden">
              {brands.length > 0 ? (
                brands.map((brand, index) => (
                  <div 
                    key={brand._id} 
                    className="rounded-2xl border border-slate-200 p-4 bg-white shadow-sm flex flex-col gap-3 text-xs"
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-400">#{index + 1}</span>
                      <span className="font-medium text-slate-500">
                        {new Date(brand.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex-1">
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Brand Name</p>
                      
                      {editingId === brand._id ? (
                        <div className="mt-1.5 flex gap-2 w-full">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full rounded-xl border bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all"
                          />
                          <div className="flex gap-1 flex-shrink-0">
                            <button
                              onClick={updateBrand}
                              className="rounded-xl bg-green-500 p-2.5 text-white hover:bg-green-600"
                            >
                              <Save size={14} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="rounded-xl bg-gray-500 p-2.5 text-white hover:bg-gray-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-0.5 font-black text-sm text-slate-900 break-words">
                          {brand.brandName}
                        </p>
                      )}
                    </div>

                    {editingId !== brand._id && (
                      <div className="flex justify-end gap-2 border-t border-slate-100 pt-2.5 mt-1">
                        <button
                          onClick={() => startEdit(brand)}
                          className="flex items-center gap-1 rounded-xl bg-blue-500 px-3 py-2 font-bold text-white hover:bg-blue-600 transition-colors"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => deleteBrand(brand._id)}
                          className="flex items-center gap-1 rounded-xl bg-red-500 px-3 py-2 font-bold text-white hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <p className="text-sm text-slate-500 font-medium">
                    No brands found.
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