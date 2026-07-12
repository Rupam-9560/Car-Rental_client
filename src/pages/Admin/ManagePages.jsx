import { useEffect, useState } from "react"
import axios from "axios"
import { FileText, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function ManagePages() {
  const admin = JSON.parse(localStorage.getItem("admin"))

  const [pages, setPages] = useState([])
  const [selectedPage, setSelectedPage] = useState(null)
  const [form, setForm] = useState({
    title: "",
    content: "",
  })

  const pageLabels = {
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    cancellation: "Cancellation Policy",
    about: "About Us",
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/pages`, {
        withCredentials: true,
      })

      setPages(res.data)

      if (res.data.length > 0) {
        setSelectedPage(res.data[0])
        setForm({
          title: res.data[0].title,
          content: res.data[0].content,
        })
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch pages")
    }
  }

  const handleSelect = (page) => {
    setSelectedPage(page)
    setForm({
      title: page.title,
      content: page.content,
    })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/pages/${selectedPage._id}`,
        form,
        { withCredentials: true }
      )

      alert(res.data.message)
      fetchPages()
    } catch (err) {
      alert(err.response?.data?.message || "Page update failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <AdminSidebar admin={admin} />

      <main className="lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Top Hero Banner - Scaled fluidly for small displays */}
          <div className="mb-6 sm:mb-8 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-r from-[#111827] to-[#991b1b] p-5 sm:p-8 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="rounded-2xl bg-white/10 p-3 sm:p-4 flex-shrink-0">
                <FileText className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Manage Pages</h1>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
                  Update website content like Terms, Privacy, Cancellation and About Us.
                </p>
              </div>
            </div>
          </div>

          {/* Core Sidebar/Content Layout Grid Split */}
          <div className="grid gap-6 lg:grid-cols-4 items-start">
            
            {/* Page Navigation list box (Horizontal pill scroll on small screen states) */}
            <div className="rounded-3xl bg-white p-4 sm:p-5 shadow-md border border-slate-100">
              <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-black text-slate-900">Pages</h2>

              <div className="flex flex-row overflow-x-auto pb-2 gap-2 lg:pb-0 lg:flex-col lg:space-y-3 lg:gap-0 scrollbar-none whitespace-nowrap lg:whitespace-normal">
                {pages.map((page) => (
                  <button
                    key={page._id}
                    onClick={() => handleSelect(page)}
                    className={`rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-left font-semibold transition-all flex-shrink-0 lg:w-full ${
                      selectedPage?._id === page._id
                        ? "bg-red-500 text-white shadow-sm shadow-red-500/20"
                        : "bg-slate-50 text-slate-700 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    {pageLabels[page.pageName]}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Textarea Content Form Wrapper Panel */}
            <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-md border border-slate-100 lg:col-span-3">
              {selectedPage ? (
                <form onSubmit={handleUpdate} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">
                      Page Title
                    </label>
                    <Input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="rounded-xl border bg-white px-4 py-2.5 sm:py-3 h-auto text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:border-red-400 focus-visible:ring-offset-0 text-slate-900 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">
                      Page Content
                    </label>
                    <textarea
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      rows="14"
                      className="w-full rounded-xl border bg-white p-4 outline-none text-sm sm:text-base text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all min-h-[300px] sm:min-h-[400px]"
                      required
                    />
                  </div>

                  <Button className="rounded-xl bg-red-500 py-5 sm:py-6 px-6 sm:px-8 text-base sm:text-lg font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 w-full sm:w-auto h-auto">
                    <Save size={18} className="flex-shrink-0" />
                    Save Changes
                  </Button>
                </form>
              ) : (
                <div className="py-12 text-center text-sm font-semibold text-gray-400 animate-pulse">
                  Loading page data structures...
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}