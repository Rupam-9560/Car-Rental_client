import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import {
  Search,
  MapPin,
  ShieldCheck,
  Car,
  Star,
  Phone,
  Mail,
  Clock,
  Fuel,
  Users,
  ArrowRight,
  Menu,
  X,
  Quote,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import carBanner from "@/assets/mainpg.jfif"

export default function Mainpg({ dashboardMode = false }) {
  const [cars, setCars] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [search, setSearch] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Pagination setups mapped perfectly to user dashboard specifications
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 6

  const [contactInfo, setContactInfo] = useState({
    phone: "+91 98765 43210",
    email: "support@rentride.com",
    supportTime: "9 AM - 8 PM",
  })

  const user = JSON.parse(localStorage.getItem("user")) || null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehicleRes, contactRes, testimonialRes] = await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_BASE_URL}/vehicles`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/contact-info`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/testimonials`),
        ])

        if (vehicleRes.status === "fulfilled") setCars(vehicleRes.value.data || [])
        if (contactRes.status === "fulfilled") setContactInfo(contactRes.value.data)
        if (testimonialRes.status === "fulfilled") setTestimonials(testimonialRes.value.data || [])
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredCars = useMemo(() => {
    return cars.filter((car) =>
      `${car.vehicleName} ${car.brand?.brandName} ${car.fuelType} ${car.transmission}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [cars, search])

  // Process paginated collections
  const totalPages = Math.ceil(filteredCars.length / carsPerPage)
  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * carsPerPage
    return filteredCars.slice(startIndex, startIndex + carsPerPage)
  }, [filteredCars, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const handleBookCar = (car) => {
    if (dashboardMode) {
      localStorage.setItem("selectedCar", JSON.stringify(car))
      window.location.href = "/user/book-car"
    } else {
      window.location.href = "/signup"
    }
  }

  const navLinks = [
    ["Home", "#home"],
    ["Cars", "#cars"],
    ["Testimonials", "#testimonials"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff7f0] text-gray-950 antialiased">
      {/* Universal Sticky Header Frame */}
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-2xl font-black tracking-tight sm:text-3xl">
            Rent<span className="text-red-500">Ride</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-black lg:flex">
            {navLinks.map(([label, link]) => (
              <a key={label} href={link} className="hover:text-red-500 transition duration-200">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {dashboardMode ? (
              <span className="rounded-full bg-red-50 px-5 py-2 text-sm font-black text-red-600">
                Hi, {user?.name || "User"}
              </span>
            ) : (
              <>
                <a href="/admin/login"><Button variant="outline" className="font-bold rounded-xl">Admin</Button></a>
                <a href="/login"><Button className="bg-red-500 hover:bg-red-600 font-bold rounded-xl">Login</Button></a>
                <a href="/signup"><Button className="bg-gray-950 hover:bg-black font-bold rounded-xl">Register</Button></a>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border p-2 lg:hidden bg-white shadow-sm"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Menu Dropdown container */}
        {menuOpen && (
          <div className="border-t bg-white px-5 py-5 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-4 font-black text-sm">
              {navLinks.map(([label, link]) => (
                <a key={label} href={link} className="hover:text-red-500 py-1" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}

              {!dashboardMode && (
                <div className="grid gap-3 pt-3 border-t border-slate-100">
                  <a href="/admin/login"><Button variant="outline" className="w-full font-bold rounded-xl">Admin</Button></a>
                  <a href="/login"><Button className="w-full bg-red-500 hover:bg-red-600 font-bold rounded-xl">Login</Button></a>
                  <a href="/signup"><Button className="w-full bg-gray-950 hover:bg-black font-bold rounded-xl">Register</Button></a>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Visual Matrix */}
      <section
        id="home"
        className="relative flex min-h-[560px] items-center bg-cover bg-center px-4 py-20 sm:min-h-[650px] sm:px-6 lg:min-h-[720px] lg:px-8"
        style={{ backgroundImage: `url(${carBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30" />

        <div className="relative mx-auto w-full max-w-7xl text-white">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-black backdrop-blur sm:px-5 sm:text-sm">
              Premium • Fast • Futuristic Car Rentals
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Drive your dream ride without the stress.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-100 sm:text-lg sm:leading-8">
              Book clean, verified and comfortable cars with a modern rental experience.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href={dashboardMode ? "#cars" : "/signup"} className="w-full sm:w-auto">
                <Button className="w-full bg-red-500 px-8 py-6 text-base hover:bg-red-600 sm:text-lg font-bold rounded-xl transition duration-300">
                  Start Booking <ArrowRight size={20} className="ml-2 inline" />
                </Button>
              </a>

              <a href="#cars" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full px-8 py-6 text-base text-black bg-white hover:bg-slate-50 sm:text-lg font-bold rounded-xl transition duration-300">
                  Explore Fleet
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Synchronized Fleet Engine Showcase */}
      <section id="cars" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-gray-200 pb-8">
          <div>
            <p className="font-black text-red-500 text-sm sm:text-base tracking-widest uppercase">Available Fleet</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">
              Choose Your Perfect Ride
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Search cars by name, brand, fuel type or transmission.
            </p>
          </div>

          <div className="flex w-full items-center rounded-2xl border bg-white px-4 py-3 shadow-sm md:w-80">
            <input
              placeholder="Search car or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-sm font-medium"
            />
            <Search size={20} className="text-red-500 flex-shrink-0" />
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-96 animate-pulse rounded-3xl bg-white shadow border border-gray-100" />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedCars.length ? paginatedCars.map((car) => (
                <CarCard key={car._id} car={car} onBook={handleBookCar} />
              )) : (
                <div className="col-span-full">
                  <EmptyBox title="No Car Found 🚗" text="Try another search." />
                </div>
              )}
            </div>

            {/* Pagination Implementation Synchronized seamlessly */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </section>

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* About Branding Matrix */}
      <section id="about" className="bg-[#fff7f0] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="font-black text-red-500 text-sm sm:text-base tracking-widest uppercase">Why RentRide</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">
              Modern rentals with a premium feel.
            </h2>
            <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
              RentRide gives users a smooth booking system, verified vehicles, easy pickup and clear pricing.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              [Car, "Multiple Cars", "Economy, SUV and premium options."],
              [ShieldCheck, "Verified Rides", "Clean and trusted vehicles."],
              [MapPin, "Easy Pickup", "Convenient pickup locations."],
              [Star, "Fair Pricing", "Simple daily rental plans."],
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Icon className="text-red-500" size={24} />
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Element Sync */}
      <ContactSection contactInfo={contactInfo} />

      {/* Landing Main Page Footer - Kept exactly as provided */}
      <Footer />
    </div>
  )
}

/* Helper Inner Component Wrappers mapped uniformly across both contexts */
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
          <p className="mt-1 text-sm font-bold text-gray-500">
            {car.brand?.brandName || "RentRide"}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-3 bg-slate-50 p-3 rounded-2xl">
            <span className="flex items-center gap-1 font-medium text-xs sm:text-sm">
              <Fuel size={16} className="text-red-500 flex-shrink-0" />
              {car.fuelType || "Petrol"}
            </span>
            <span className="flex items-center gap-1 font-medium text-xs sm:text-sm">
              <Users size={16} className="text-red-500 flex-shrink-0" />
              {car.seats || 5} Seats
            </span>
            <span className="flex items-center gap-1 font-medium text-xs sm:text-sm">
              <Car size={16} className="text-red-500 flex-shrink-0" />
              {car.transmission || "Manual"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-4">
          <p className="text-xl font-black text-red-500 sm:text-2xl">
            ₹{car.pricePerDay || 1499}<span className="text-xs font-bold text-gray-500 font-sans">/day</span>
          </p>
          <Button
            onClick={() => onBook(car)}
            className="w-full bg-slate-950 hover:bg-black font-bold transition duration-300 rounded-xl sm:w-auto"
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
    <section id="testimonials" className="bg-white px-4 py-14 sm:px-5 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-black text-red-500 text-sm sm:text-base tracking-widest uppercase">Approved Testimonials</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">What Riders Say</h2>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">Only admin-approved reviews appear here.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.length ? testimonials.map((item) => (
            <TestimonialCard key={item._id} item={item} />
          )) : (
            <div className="col-span-full">
              <EmptyBox title="No Approved Testimonials Yet" text="Admin approved testimonials will appear here." />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ item }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-[#fffaf5] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 flex flex-col justify-between">
      <div>
        <Quote className="text-red-500 fill-red-500/10" size={32} />
        <p className="mt-5 leading-7 text-gray-700 italic">“{item.message || item.feedback}”</p>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-amber-100/60 pt-4">
        <h3 className="font-black text-slate-900 text-sm sm:text-base">{item.user?.name || "RentRide User"}</h3>
        <div className="flex text-red-500 flex-shrink-0">
          {Array.from({ length: Number(item.rating) || 5 }).map((_, i) => (
            <Star key={i} size={15} fill="currentColor" />
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactSection({ contactInfo }) {
  return (
    <section id="contact" className="bg-white px-4 py-14 sm:px-5 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-black text-red-500 text-sm sm:text-base tracking-widest uppercase">Contact</p>
        <h2 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">Need help with your ride?</h2>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <ContactCard icon={<Phone />} title="Phone" value={contactInfo.phone} />
          <ContactCard icon={<Mail />} title="Email" value={contactInfo.email} />
          <ContactCard icon={<Clock />} title="Support Time" value={contactInfo.supportTime} />
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-[#fffaf5] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
      <div className="mx-auto flex justify-center text-red-500 mb-3">{icon}</div>
      <h3 className="font-black text-slate-900">{title}</h3>
      <p className="mt-2 break-words text-gray-600 text-sm sm:text-base font-medium">{value || "Coming soon"}</p>
    </div>
  )
}

function EmptyBox({ title, text }) {
  return (
    <div className="w-full rounded-3xl border border-dashed border-gray-300 p-10 text-center bg-[#fffaf5]">
      <h3 className="text-xl font-black sm:text-2xl text-gray-700">{title}</h3>
      <p className="mt-2 text-gray-500 font-medium">{text}</p>
    </div>
  )
}

// Left completely as requested
function Footer() {
  return (
    <footer className="bg-[#0b1120] px-4 py-14 text-white sm:px-5 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-3xl font-black">Rent<span className="text-red-500">Ride</span></h2>
          <p className="mt-4 leading-7 text-gray-400">
            Futuristic car rentals for city rides, trips and business travel.
          </p>
        </div>

        <FooterLinks title="Quick Links" links={[["Home", "#home"], ["Cars", "#cars"], ["Testimonials", "#testimonials"], ["Contact", "#contact"]]} />
        <FooterLinks title="Policies" links={[["Terms & Conditions", "/terms"], ["Privacy Policy", "/privacy-policy"], ["Cancellation Policy", "/cancellation-policy"]]} />
        <FooterLinks title="Account" links={[["Admin Login", "/admin/login"], ["User Login", "/login"], ["Register", "/signup"]]} />
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © 2026 RentRide. All Rights Reserved.
      </div>
    </footer>
  )
}

function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-xl font-black">{title}</h3>
      <div className="flex flex-col gap-3 text-gray-400">
        {links.map(([label, link]) => (
          <a key={label} href={link} className="transition hover:text-red-500">{label}</a>
        ))}
      </div>
    </div>
  )
}