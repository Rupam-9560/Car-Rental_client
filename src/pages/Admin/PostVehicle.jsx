import { useEffect, useState } from "react"
import axios from "axios"
import { Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function PostVehicle() {
  const admin = JSON.parse(localStorage.getItem("admin"))
  const [brands, setBrands] = useState([])
  const [form, setForm] = useState({
    brand: "",
    vehicleName: "",
    pricePerDay: "",
    fuelType: "Petrol",
    transmission: "Manual",
    seats: "",
    ac: "true",
    modelYear: "",
    vehicleNumber: "",
    description: "",
    features: "",
    status: "available",
  })
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/brands`, {
        withCredentials: true,
      })
      setBrands(res.data)
    }

    fetchBrands()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!image) {
    alert("Please select a vehicle image")
    return
  }

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ]

  if (!allowedTypes.includes(image.type)) {
    alert("Only JPG, PNG and WEBP images are allowed")
    return
  }

  if (image.size > 5 * 1024 * 1024) {
    alert("Image must be smaller than 5 MB")
    return
  }

  const data = new FormData()

  Object.entries(form).forEach(([key, value]) => {
    data.append(key, value)
  })

  data.append("image", image)

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/post-vehicle`,
      data,
      {
        withCredentials: true,
      }
    )

    alert(res.data.message)
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Vehicle post failed"
    )
  }
}

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <AdminSidebar admin={admin} />

      <main className="lg:ml-72 min-h-screen flex flex-col">
        <AdminNavbar admin={admin} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="rounded-3xl bg-white p-4 sm:p-8 shadow-xl border border-slate-100">
            <div className="mb-6 sm:mb-8 text-center border-b border-slate-100 pb-4 sm:pb-6">
              <Car className="mx-auto text-red-500" size={40} />
              <h1 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">Post Vehicle</h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                Add a new vehicle to the public RentRide fleet.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">Brand</label>
                <div className="flex items-center rounded-xl border bg-white px-1 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
                  <select
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent px-3 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 outline-none"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.brandName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Field label="Vehicle Name" name="vehicleName" value={form.vehicleName} onChange={handleChange} />
              <Field label="Price Per Day" name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} />
              <Field label="Seats" name="seats" type="number" value={form.seats} onChange={handleChange} />
              <Field label="Model Year" name="modelYear" value={form.modelYear} onChange={handleChange} />
              <Field label="Vehicle Number" name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} />

              <div>
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">Fuel Type</label>
                <div className="flex items-center rounded-xl border bg-white px-1 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
                  <select name="fuelType" value={form.fuelType} onChange={handleChange} className="w-full bg-transparent px-3 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 outline-none">
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>CNG</option>
                    <option>Electric</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">Transmission</label>
                <div className="flex items-center rounded-xl border bg-white px-1 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
                  <select name="transmission" value={form.transmission} onChange={handleChange} className="w-full bg-transparent px-3 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 outline-none">
                    <option>Manual</option>
                    <option>Automatic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">AC</label>
                <div className="flex items-center rounded-xl border bg-white px-1 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
                  <select name="ac" value={form.ac} onChange={handleChange} className="w-full bg-transparent px-3 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 outline-none">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">Status</label>
                <div className="flex items-center rounded-xl border bg-white px-1 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
                  <select name="status" value={form.status} onChange={handleChange} className="w-full bg-transparent px-3 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 outline-none">
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">Features</label>
                <Input
                  name="features"
                  value={form.features}
                  onChange={handleChange}
                  placeholder="AC, Music System, Airbags, GPS"
                  className="rounded-xl border bg-white px-4 py-2.5 sm:py-3 h-auto text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:border-red-400 focus-visible:ring-offset-0 text-slate-900 placeholder:text-gray-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-xl border bg-white p-4 outline-none text-sm sm:text-base text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all"
                  placeholder="Enter detailed vehicle condition or rental specifications..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">Vehicle Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="rounded-xl border bg-white px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer h-auto text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:border-red-400 focus-visible:ring-offset-0 text-slate-600"
                  required
                />
              </div>

              <Button className="md:col-span-2 rounded-xl bg-red-500 py-5 sm:py-6 text-base sm:text-lg font-bold hover:bg-red-600 transition-all mt-2">
                Post Vehicle
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm sm:text-base font-semibold text-slate-800">{label}</label>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-xl border bg-white px-4 py-2.5 sm:py-3 h-auto text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:border-red-400 focus-visible:ring-offset-0 text-slate-900 placeholder:text-gray-400"
        required
      />
    </div>
  )
}