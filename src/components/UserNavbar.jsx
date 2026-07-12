import { Menu } from "lucide-react"

function UserNavbar({ setOpen, user }) {
  console.log("USER NAVBAR =", user)

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-20">

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl border p-2 transition hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>

          <a
            href="/user/dashboard"
            className="truncate text-2xl font-black tracking-tight sm:text-3xl"
          >
            Rent<span className="text-red-500">Ride</span>
          </a>
        </div>

        <nav className="hidden items-center gap-6 font-semibold lg:flex xl:gap-8">
          <a href="/user/dashboard#home" className="hover:text-red-500">
            Home
          </a>

          <a href="/user/dashboard#cars" className="hover:text-red-500">
            Cars
          </a>

          <a href="/user/dashboard#about" className="hover:text-red-500">
            About
          </a>

          <a href="/user/dashboard#testimonials" className="hover:text-red-500">
            Testimonials
          </a>

          <a href="/user/dashboard#contact" className="hover:text-red-500">
            Contact
          </a>
        </nav>

        <div className="max-w-[120px] truncate rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 sm:max-w-[180px] sm:px-5 sm:text-base">
          Hi, {user?.name || "User"}
        </div>

      </div>
    </header>
  )
}

export default UserNavbar