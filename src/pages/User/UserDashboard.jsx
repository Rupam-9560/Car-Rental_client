import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import {
  Search,
  Car,
  Star,
  Phone,
  Mail,
  Clock,
  Fuel,
  Users,
  ArrowRight,
  Quote,
  CalendarDays,
  ShieldCheck,
  MapPin,
  LifeBuoy,
  User,
  Wallet,
  Gauge,
  Menu,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import UserNavbar from "@/components/UserNavbar"
import UserSidebar from "@/components/UserSidebar"
import carBanner from "@/assets/mainpg.jfif"

export default function UserDashboard() {
  const [cars, setCars] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [search, setSearch] = useState("")
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 6

  const [contactInfo, setContactInfo] = useState({
    phone: "+91 98765 43210",
    email: "support@rentride.com",
    supportTime: "9 AM - 8 PM",
  })

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const authRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/dashboard`, {
          withCredentials: true,
          headers: {                      
            Authorization: `Bearer ${token}`
          }
        })

        setUser(authRes.data.user)
        localStorage.setItem("user", JSON.stringify(authRes.data.user))

        const [carRes, contactRes, testimonialRes] =
          await Promise.allSettled([
            axios.get(`${import.meta.env.VITE_BASE_URL}/vehicles`),
            axios.get(`${import.meta.env.VITE_BASE_URL}/contact-info`),
            axios.get(`${import.meta.env.VITE_BASE_URL}/testimonials`),
          ])

        if (carRes.status === "fulfilled") {
          setCars(carRes.value.data || [])
        }

        if (contactRes.status === "fulfilled") {
          setContactInfo(contactRes.value.data)
        }

        if (testimonialRes.status === "fulfilled") {
          setTestimonials(testimonialRes.value.data || [])
        }
      } catch (err) {
        localStorage.removeItem("user")
        window.location.href = "/login"
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const filteredCars = useMemo(() => {
    return cars.filter((car) =>
      `${car.vehicleName} ${car.brand?.brandName} ${car.fuelType} ${car.transmission}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [cars, search])

  // Paginated cars calculation
  const totalPages = Math.ceil(filteredCars.length / carsPerPage)
  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * carsPerPage
    return filteredCars.slice(startIndex, startIndex + carsPerPage)
  }, [filteredCars, currentPage])

  // Reset page number on search criteria update
  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const handleBookCar = (car) => {
    localStorage.setItem("selectedCar", JSON.stringify(car))
    window.location.href = "/user/book-car"
  }

  const handleLogout = async () => {
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 sm:p-10 text-center shadow-2xl backdrop-blur">
          <Car className="mx-auto text-red-400 animate-bounce" size={42} />
          <h1 className="mt-5 text-2xl sm:text-3xl font-black">Loading Dashboard</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Setting up your RentRide space...
          </p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#fff7f0] text-gray-950 overflow-x-hidden antialiased">
      <UserSidebar open={open} setOpen={setOpen} user={user} />
      <UserNavbar setOpen={setOpen} user={user} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex min-h-[600px] sm:min-h-[720px] items-center bg-cover bg-center px-4 sm:px-6 lg:px-8 py-20 sm:py-0"
        style={{ backgroundImage: `url(${carBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30" />

        <div className="relative mx-auto w-full max-w-7xl text-white">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/15 px-4 sm:px-5 py-2 text-xs sm:text-sm font-black backdrop-blur">
              Welcome back, {user?.name}
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Book your next ride with confidence.
            </h1>

            <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed sm:leading-8 text-gray-100">
              Choose your car, send booking request, track status, raise tickets
              and manage your RentRide profile from one dashboard.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#cars" className="w-full sm:w-auto">
                <Button className="w-full bg-red-500 px-8 py-6 text-base sm:text-lg hover:bg-red-600 transition duration-300 rounded-xl">
                  Explore Cars <ArrowRight size={20} className="ml-2 inline animate-pulse" />
                </Button>
              </a>

              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white px-8 py-3 font-bold text-slate-950 hover:bg-slate-100 w-full sm:w-auto h-[52px] transition duration-300"
              >
                <Menu size={20} />
                Open Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards Section */}
      <section className="-mt-12 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl">
          <StatCard icon={<Car />} title="Available Cars" value={cars.length} />
          <StatCard icon={<Star />} title="Approved Reviews" value={testimonials.length} />
          <StatCard icon={<Wallet />} title="Starting Price" value="₹1499" />
          <StatCard icon={<ShieldCheck />} title="Verified Fleet" value="100%" />
        </div>
      </section>

      {/* Action Navigation Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ActionCard
            icon={<CalendarDays />}
            title="My Bookings"
            text="Check pending, confirmed and cancelled bookings."
            link="/user/bookings"
          />
          <ActionCard
            icon={<User />}
            title="Profile"
            text="Manage your account details."
            link="/user/profile"
          />
          <ActionCard
            icon={<LifeBuoy />}
            title="Support"
            text="Raise or track support tickets."
            link="/user/generate-ticket"
          />
          <ActionCard
            icon={<Star />}
            title="Review"
            text="Share your RentRide experience."
            link="/user/add-testimonial"
          />
        </div>
      </section>

      {/* Main Cars Engine Gallery */}
      <section id="cars" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-gray-200 pb-8">
          <div>
            <p className="font-black text-red-500 text-sm sm:text-base tracking-widest uppercase">Available Fleet</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">
              Choose Your Perfect Ride
            </h2>
            <p className="mt-2 sm:mt-3 max-w-xl text-sm sm:text-base text-gray-600">
              Search cars by name, brand, fuel type or transmission.
            </p>
          </div>

          <div className="flex items-center rounded-2xl border bg-white px-4 py-3 shadow-sm w-full md:w-80">
            <input
              placeholder="Search car or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-sm font-medium"
            />
            <Search size={20} className="text-red-500 flex-shrink-0" />
          </div>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedCars.length ? (
            paginatedCars.map((car) => (
              <CarCard key={car._id} car={car} onBook={handleBookCar} />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyBox title="No Car Found 🚗" text="Try another search." />
            </div>
          )}
        </div>

        {/* Dynamic Pagination Core Integration */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </section>

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Brand Identity / Core Core Section */}
      <section id="about" className="bg-[#fff7f0] px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-black text-red-500 text-sm sm:text-base tracking-widest uppercase">Why RentRide</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">
              Modern rentals with a premium feel.
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed sm:leading-8 text-gray-600">
              RentRide gives users a smooth booking system, verified vehicles,
              easy pickup and clear pricing.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [Car, "Multiple Cars", "Economy, SUV and premium options."],
              [ShieldCheck, "Verified Rides", "Clean and trusted vehicles."],
              [MapPin, "Easy Pickup", "Convenient pickup locations."],
              [Star, "Fair Pricing", "Simple daily rental plans."],
            ].map(([Icon, title, text]) => (
              <div
                key={title}
                className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Icon className="text-red-500" size={24} />
                <h3 className="mt-4 text-lg sm:text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section UI Contextual Sync */}
      <ContactSection contactInfo={contactInfo} />

      {/* Standardized Dashboard Footer - Kept exactly as provided */}
      <DashboardFooter handleLogout={handleLogout} />
    </div>
  )
}

/* Helper Inner Component Wrappers */
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-xl border bg-white shadow-sm disabled:opacity-40 hover:bg-red-50 hover:border-red-300 transition"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl border text-sm font-black shadow-sm transition
            ${currentPage === page
              ? "bg-red-500 text-white border-red-500"
              : "bg-white hover:bg-red-50 hover:border-red-300"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-xl border bg-white shadow-sm disabled:opacity-40 hover:bg-red-50 hover:border-red-300 transition"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-red-50 p-3 text-red-500">{icon}</div>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600">
          Active
        </span>
      </div>
      <h3 className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-black">{value}</h3>
      <p className="mt-1 text-xs sm:text-sm font-bold text-slate-500">{title}</p>
    </div>
  )
}

function ActionCard({ icon, title, text, link }) {
  return (
    <a
      href={link}
      className="group rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition duration-300 group-hover:bg-red-500">
        {icon}
      </div>
      <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-black group-hover:text-red-500 transition duration-300">{title}</h3>
      <p className="mt-2 text-sm sm:text-base text-slate-600">{text}</p>
      <p className="mt-4 sm:mt-5 inline-flex items-center gap-2 font-black text-red-500 text-sm sm:text-base">
        Open <ArrowRight size={17} className="group-hover:translate-x-1 transition duration-200" />
      </p>
    </a>
  )
}

function CarCard({ car, onBook }) {
  const imageSrc = car.image
    ? car.image.startsWith("http")
      ? car.image
      : `${import.meta.env.VITE_BASE_URL}${car.image}`
    : "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900"

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative overflow-hidden group">
        <img
          src={imageSrc}
          alt={car.vehicleName}
          className="h-48 w-full object-cover sm:h-56 transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900"
          }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1 text-xs font-black capitalize text-red-500 shadow-md backdrop-blur sm:text-sm">
          {car.status || "available"}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className="text-xl font-black sm:text-2xl tracking-tight text-slate-900">
            {car.vehicleName}
          </h3>
          <p className="mt-1 text-xs font-bold text-gray-500 sm:text-sm">
            {car.brand?.brandName || "RentRide"}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-gray-600 sm:text-sm bg-slate-50 p-3 rounded-2xl">
            <span className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              <Fuel size={16} className="text-red-500 flex-shrink-0" />
              {car.fuelType || "Petrol"}
            </span>
            <span className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              <Users size={16} className="text-red-500 flex-shrink-0" />
              {car.seats || 5} Seats
            </span>
            <span className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              <Gauge size={16} className="text-red-500 flex-shrink-0" />
              {car.transmission || "Manual"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <p className="whitespace-nowrap text-xl font-black text-red-500 sm:text-2xl">
            ₹{car.pricePerDay || 1499}
            <span className="text-xs font-bold text-gray-500 sm:text-sm font-sans">/day</span>
          </p>
          <Button
            onClick={() => onBook(car)}
            className="bg-slate-950 px-5 hover:bg-black font-bold transition duration-300 text-sm rounded-xl"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}

function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="bg-white px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-black text-red-500 text-sm sm:text-base tracking-widest uppercase">Approved Testimonials</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">
            What Riders Say
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
            Only admin-approved reviews appear here.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.length ? (
            testimonials.map((item) => (
              <TestimonialCard key={item._id} item={item} />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyBox
                title="No Approved Testimonials Yet"
                text="Admin approved testimonials will appear here."
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ item }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-[#fffaf5] p-6 sm:p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
      <div>
        <Quote className="text-red-500 fill-red-500/10" size={32} />
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-700 italic">
          “{item.message || item.feedback}”
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-amber-100/60 pt-4">
        <h3 className="font-black text-sm sm:text-base truncate text-slate-900">{item.user?.name || "RentRide User"}</h3>
        <div className="flex text-red-500 flex-shrink-0">
          {Array.from({ length: Number(item.rating) || 5 }).map((_, i) => (
            <Star key={i} size={15} fill="currentColor" />
          ))}
        </div>
      </div>
    </div>
  )
}

function EmptyBox({ title, text }) {
  return (
    <div className="w-full rounded-3xl border border-dashed border-gray-300 p-10 text-center bg-[#fffaf5]">
      <h3 className="text-xl font-black text-gray-700">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 font-medium">{text}</p>
    </div>
  )
}

function ContactSection({ contactInfo }) {
  return (
    <section id="contact" className="bg-white px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-black text-red-500 text-sm sm:text-base tracking-widest uppercase">Contact</p>
        <h2 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">
          Need help with your ride?
        </h2>

        <div className="mx-auto mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl">
          <ContactCard icon={<Phone />} title="Phone" value={contactInfo.phone} />
          <ContactCard icon={<Mail />} title="Email" value={contactInfo.email} />
          <div className="sm:col-span-2 md:col-span-1">
            <ContactCard icon={<Clock />} title="Support Time" value={contactInfo.supportTime} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-[#fffaf5] p-6 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mx-auto flex justify-center text-red-500 mb-3">{icon}</div>
      <h3 className="font-black text-sm sm:text-base text-slate-900">{title}</h3>
      <p className="mt-2 text-sm sm:text-base text-gray-600 break-words font-medium">{value || "Coming soon"}</p>
    </div>
  )
}

// Left completely as requested
function DashboardFooter({ handleLogout }) {
  return (
    <footer className="bg-slate-950 px-4 sm:px-6 lg:px-8 xl:px-20 py-12 sm:py-14 text-white">
      <div className="mx-auto max-w-7xl grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Rent<span className="text-red-500">Ride</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-400">
            A simple and confident dashboard for your car rental journey.
          </p>
        </div>

        <FooterLinks
          title="Quick Links"
          links={[
            ["Book Car", "#cars"],
            ["Testimonials", "#testimonials"],
            ["My Bookings", "/user/bookings"],
            ["Profile", "/user/profile"],
          ]}
        />

        <FooterLinks
          title="Support"
          links={[
            ["Generate Ticket", "/user/generate-ticket"],
            ["Ticket History", "/user/ticket-history"],
            ["Contact", "#contact"],
          ]}
        />

        <div>
          <h3 className="mb-4 text-lg sm:text-xl font-black">Account</h3>
          <div className="flex flex-col gap-3 text-sm sm:text-base text-slate-400">
            <a href="/terms" className="hover:text-red-400 transition-colors">Terms & Conditions</a>
            <a href="/privacy-policy" className="hover:text-red-400 transition-colors">Privacy Policy</a>
            <a href="/cancellation-policy" className="hover:text-red-400 transition-colors">Cancellation Policy</a>
            
            <button
              onClick={handleLogout}
              className="mt-2 inline-flex items-center gap-2 font-black text-red-400 hover:text-red-300 transition-colors w-max"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs sm:text-sm text-slate-500">
        © 2026 RentRide. All Rights Reserved.
      </div>
    </footer>
  )
}

function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-lg sm:text-xl font-black">{title}</h3>
      <div className="flex flex-col gap-3 text-sm sm:text-base text-slate-400">
        {links.map(([label, link]) => (
          <a key={label} href={link} className="hover:text-red-400 transition-colors">
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}