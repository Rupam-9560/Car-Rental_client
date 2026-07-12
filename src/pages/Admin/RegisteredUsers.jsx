import { useEffect, useState } from "react"
import axios from "axios"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function RegisteredUsers() {
  const admin = JSON.parse(localStorage.getItem("admin"))

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/users`,
        {
          withCredentials: true,
        }
      )

      setUsers(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <AdminSidebar admin={admin} />

      <main className="lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="rounded-3xl bg-white p-4 sm:p-8 shadow-xl border border-slate-100">
            <div className="mb-6 sm:mb-8 border-b border-slate-100 pb-4 sm:pb-6">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Registered Users
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Total Users: <span className="font-bold text-slate-900">{users.length}</span>
              </p>
            </div>

            {loading ? (
              <div className="py-12 text-center text-sm font-semibold text-gray-500 animate-pulse">
                Loading users...
              </div>
            ) : (
              <>
                {/* Desktop and Tablet View (Hidden on mobile) */}
                <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-slate-50 text-slate-700 text-xs sm:text-sm">
                        <th className="p-3 text-left font-black">S.No.</th>
                        <th className="p-3 text-left font-black">Name</th>
                        <th className="p-3 text-left font-black">Email</th>
                        <th className="p-3 text-left font-black">Phone</th>
                        <th className="p-3 text-left font-black">Gender</th>
                        <th className="p-3 text-left font-black">Country</th>
                        <th className="p-3 text-left font-black">Joined</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 bg-white text-xs sm:text-sm text-slate-600">
                      {users.map((user, index) => (
                        <tr
                          key={user._id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="p-4 w-12 text-slate-400">
                            {index + 1}
                          </td>
                          <td className="p-4 font-bold text-slate-900">
                            {user.name}
                          </td>
                          <td className="p-4 break-all">
                            {user.email}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {user.number}
                          </td>
                          <td className="p-4 capitalize">
                            {user.gender}
                          </td>
                          <td className="p-4 truncate max-w-[120px]">
                            {user.country || "-"}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}

                      {users.length === 0 && (
                        <tr>
                          <td colSpan="7" className="p-12 text-center font-medium text-gray-400">
                            No registered users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Grid Card View (Hidden on desktops/tablets) */}
                <div className="grid gap-4 md:hidden">
                  {users.map((user, index) => (
                    <div 
                      key={user._id} 
                      className="rounded-2xl border border-slate-200 p-4 bg-white shadow-sm flex flex-col gap-3 text-xs"
                    >
                      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-400">#{index + 1}</span>
                        <span className="font-medium text-slate-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div>
                        <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Name</p>
                        <p className="mt-0.5 font-black text-sm text-slate-900 break-words">{user.name}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Phone</p>
                          <p className="mt-0.5 font-medium text-slate-700 break-all">{user.number}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Gender</p>
                          <p className="mt-0.5 font-medium text-slate-700 capitalize">{user.gender}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Country</p>
                          <p className="mt-0.5 font-medium text-slate-700 truncate">{user.country || "-"}</p>
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Email</p>
                          <p className="mt-0.5 font-medium text-slate-700 break-all">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {users.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <p className="text-sm text-gray-500 font-medium">
                        No registered users found.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}