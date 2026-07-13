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
  CheckCircle2,
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
          <Car className="mx-auto text-red-400" size={42} />
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
    <div className="min-h-screen bg-[#fff7f0] text-gray-950 overflow-x-hidden">
      <UserSidebar open={open} setOpen={setOpen} user={user} />
      <UserNavbar setOpen={setOpen} user={user} />

      <section
        id="home"
        className="relative flex min-h-[600px] sm:min-h-[720px] items-center bg-cover bg-center px-4 sm:px-6 lg:px-8 py-20 sm:py-0"
        style={{ backgroundImage: `url(${carBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />

        <div className="relative mx-auto w-full max-w-7xl text-white">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/15 px-4 sm:px-5 py-2 text-xs sm:text-sm font-black backdrop-blur">
              Welcome back, {user?.name}
            </p>

            <h1 className="text-3xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Book your next ride with confidence.
            </h1>

            <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed sm:leading-8 text-gray-100">
              Choose your car, send booking request, track status, raise tickets
              and manage your RentRide profile from one dashboard.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#cars" className="w-full sm:w-auto">
                <Button className="w-full bg-red-500 px-8 py-6 text-lg hover:bg-red-600">
                  Explore Cars <ArrowRight size={20} className="ml-2 inline" />
                </Button>
              </a>

              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white px-8 py-3 font-bold text-slate-950 hover:bg-slate-100 w-full sm:w-auto h-[52px]"
              >
                <Menu size={20} />
                Open Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl">
          <StatCard icon={<Car />} title="Available Cars" value={cars.length} />
          <StatCard icon={<Star />} title="Approved Reviews" value={testimonials.length} />
          <StatCard icon={<Wallet />} title="Starting Price" value="₹1499" />
          <StatCard icon={<ShieldCheck />} title="Verified Fleet" value="100%" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      <section id="cars" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-black text-red-500 text-sm sm:text-base">AVAILABLE FLEET</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-5xl">
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
              className="w-full bg-transparent outline-none text-sm"
            />
            <Search size={20} className="text-red-500 flex-shrink-0" />
          </div>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.length ? (
            filteredCars.map((car) => (
              <CarCard key={car._id} car={car} onBook={handleBookCar} />
            ))
          ) : (
            <div className="sm:col-span-2 lg:col-span-3">
              <EmptyBox title="No Car Found 🚗" text="Try another search." />
            </div>
          )}
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <section id="about" className="bg-[#fff7f0] px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-black text-red-500 text-sm sm:text-base">WHY RENTRIDE</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-5xl">
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
                className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Icon className="text-red-500" />
                <h3 className="mt-4 text-lg sm:text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection contactInfo={contactInfo} />

      <DashboardFooter handleLogout={handleLogout} />
    </div>
  )
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl border bg-white p-5 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
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
      className="group rounded-3xl border bg-white p-5 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:bg-red-500">
        {icon}
      </div>

      <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm sm:text-base text-slate-600">{text}</p>

      <p className="mt-4 sm:mt-5 inline-flex items-center gap-2 font-black text-red-500 text-sm sm:text-base">
        Open <ArrowRight size={17} />
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
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative">
        <img
          src={imageSrc}
          alt={car.vehicleName}
          className="h-48 w-full object-cover sm:h-56"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900"
          }}
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1 text-xs font-black capitalize text-red-500 shadow sm:text-sm">
          {car.status || "available"}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className="text-xl font-black sm:text-2xl">
            {car.vehicleName}
          </h3>

          <p className="mt-1 text-xs font-bold text-gray-500 sm:text-sm">
            {car.brand?.brandName || "RentRide"}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-600 sm:mt-5 sm:text-sm">
            <span className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
              <Fuel size={16} className="flex-shrink-0" />
              {car.fuelType || "Petrol"}
            </span>

            <span className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
              <Users size={16} className="flex-shrink-0" />
              {car.seats || 5} Seats
            </span>

            <span className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
              <Gauge size={16} className="flex-shrink-0" />
              {car.transmission || "Manual"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
          <p className="whitespace-nowrap text-xl font-black text-red-500 sm:text-2xl">
            ₹{car.pricePerDay || 1499}
            <span className="text-xs font-bold text-gray-500 sm:text-sm">
              /day
            </span>
          </p>

          <Button
            onClick={() => onBook(car)}
            className="bg-gray-950 px-4 hover:bg-black sm:px-6"
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
          <p className="font-black text-red-500 text-sm sm:text-base">APPROVED TESTIMONIALS</p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-5xl">
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
            <div className="sm:col-span-2 lg:col-span-3">
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
    <div className="rounded-3xl border bg-[#fffaf5] p-6 sm:p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
      <div>
        <Quote className="text-red-500" />
        <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-gray-700">
          “{item.message || item.feedback}”
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <h3 className="font-black text-sm sm:text-base truncate">{item.user?.name || "RentRide User"}</h3>

        <div className="flex text-red-500 flex-shrink-0">
          {Array.from({ length: Number(item.rating) || 5 }).map((_, i) => (
            <Star key={i} size={14} sm:size={16} fill="currentColor" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Fallback layout component standardizer
function EmptyBox({ title, text }) {
  return (
    <div className="w-full rounded-3xl border border-dashed border-gray-300 p-8 text-center bg-[#fffaf5]">
      <h3 className="text-xl font-bold text-gray-700">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{text}</p>
    </div>
  )
}

function ContactSection({ contactInfo }) {
  return (
    <section id="contact" className="bg-white px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-black text-red-500 text-sm sm:text-base">CONTACT</p>
        <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-5xl">
          Need help with your ride?
        </h2>

        <div className="mx-auto mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 max-w-5xl">
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
    <div className="rounded-3xl border bg-[#fffaf5] p-6 sm:p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mx-auto flex justify-center text-red-500">{icon}</div>
      <h3 className="mt-4 font-black text-sm sm:text-base">{title}</h3>
      <p className="mt-2 text-sm sm:text-base text-gray-600 break-words">{value || "Coming soon"}</p>
    </div>
  )
}

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