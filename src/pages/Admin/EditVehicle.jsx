import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Car, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminNavbar from "@/components/AdminNavbar"
import AdminSidebar from "@/components/AdminSidebar"

export default function EditVehicle() {
  const { id } = useParams()
  const navigate = useNavigate()

  const admin = JSON.parse(localStorage.getItem("admin"))

  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const [oldImage, setOldImage] = useState("")
  const [newImage, setNewImage] = useState(null)
  const [preview, setPreview] = useState("")

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

  const getImageUrl = (image) => {
    if (!image) return ""

    return image.startsWith("http")
      ? image
      : `${import.meta.env.VITE_BASE_URL}${image}`
  }

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [brandsResponse, vehicleResponse] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/admin/brands`,
            {
              withCredentials: true,
            }
          ),

          axios.get(
            `${import.meta.env.VITE_BASE_URL}/admin/vehicle/${id}`,
            {
              withCredentials: true,
            }
          ),
        ])

        setBrands(brandsResponse.data)

        const vehicle = vehicleResponse.data

        setForm({
          brand:
            typeof vehicle.brand === "object"
              ? vehicle.brand?._id || ""
              : vehicle.brand || "",

          vehicleName: vehicle.vehicleName || "",
          pricePerDay: vehicle.pricePerDay || "",
          fuelType: vehicle.fuelType || "Petrol",
          transmission: vehicle.transmission || "Manual",
          seats: vehicle.seats || "",
          ac: String(vehicle.ac ?? true),
          modelYear: vehicle.modelYear || "",
          vehicleNumber: vehicle.vehicleNumber || "",
          description: vehicle.description || "",
          features: Array.isArray(vehicle.features)
            ? vehicle.features.join(", ")
            : vehicle.features || "",
          status: vehicle.status || "available",
        })

        setOldImage(vehicle.image || "")
      } catch (err) {
        console.log("EDIT VEHICLE LOAD ERROR:", err)

        alert(
          err.response?.data?.message ||
            "Vehicle details load nahi ho paayi"
        )
      } finally {
        setLoading(false)
      }
    }

    loadPageData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG and WEBP images are allowed")
      e.target.value = ""
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size 5 MB se kam honi chahiye")
      e.target.value = ""
      return
    }

    setNewImage(file)

    if (preview) {
      URL.revokeObjectURL(preview)
    }

    setPreview(URL.createObjectURL(file))
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()

    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value)
    })

    // New image select hui hai tabhi backend ko bhejenge.
    // New image select nahi hui to old image same rahegi.
    if (newImage) {
      data.append("image", newImage)
    }

    try {
      setUpdating(true)

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/update-vehicle/${id}`,
        data,
        {
          withCredentials: true,
        }
      )

      alert(res.data.message || "Vehicle updated successfully")

      navigate("/admin/manage-vehicles")
    } catch (err) {
      console.log("UPDATE VEHICLE ERROR:", err)

      alert(
        err.response?.data?.message ||
          "Vehicle update failed"
      )
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-red-500" />

          <p className="mt-4 font-semibold text-slate-600">
            Vehicle details loading...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <AdminSidebar admin={admin} />

      <main className="flex min-h-screen flex-col lg:ml-72">
        <AdminNavbar admin={admin} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-xl sm:p-8">
            <div className="mb-6 border-b border-slate-100 pb-5 text-center sm:mb-8 sm:pb-6">
              <Car
                className="mx-auto text-red-500"
                size={42}
              />

              <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Edit Vehicle
              </h1>

              <p className="mx-auto mt-1 max-w-md text-xs text-gray-500 sm:text-sm">
                Vehicle details update karo. New image optional hai.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-4 sm:gap-5 md:grid-cols-2"
            >
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-800 sm:text-base">
                  Brand
                </label>

                <div className="flex items-center rounded-xl border bg-white px-1 transition-all focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100">
                  <select
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none sm:py-3 sm:text-base"
                  >
                    <option value="">
                      Select Brand
                    </option>

                    {brands.map((brand) => (
                      <option
                        key={brand._id}
                        value={brand._id}
                      >
                        {brand.brandName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Field
                label="Vehicle Name"
                name="vehicleName"
                value={form.vehicleName}
                onChange={handleChange}
              />

              <Field
                label="Price Per Day"
                name="pricePerDay"
                type="number"
                min="0"
                value={form.pricePerDay}
                onChange={handleChange}
              />

              <Field
                label="Seats"
                name="seats"
                type="number"
                min="1"
                value={form.seats}
                onChange={handleChange}
              />

              <Field
                label="Model Year"
                name="modelYear"
                type="number"
                min="1900"
                value={form.modelYear}
                onChange={handleChange}
              />

              <Field
                label="Vehicle Number"
                name="vehicleNumber"
                value={form.vehicleNumber}
                onChange={handleChange}
              />

              <SelectField
                label="Fuel Type"
                name="fuelType"
                value={form.fuelType}
                onChange={handleChange}
              >
                <option value="Petrol">
                  Petrol
                </option>

                <option value="Diesel">
                  Diesel
                </option>

                <option value="CNG">
                  CNG
                </option>

                <option value="Electric">
                  Electric
                </option>
              </SelectField>

              <SelectField
                label="Transmission"
                name="transmission"
                value={form.transmission}
                onChange={handleChange}
              >
                <option value="Manual">
                  Manual
                </option>

                <option value="Automatic">
                  Automatic
                </option>
              </SelectField>

              <SelectField
                label="AC"
                name="ac"
                value={form.ac}
                onChange={handleChange}
              >
                <option value="true">
                  Yes
                </option>

                <option value="false">
                  No
                </option>
              </SelectField>

              <SelectField
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="available">
                  Available
                </option>

                <option value="booked">
                  Booked
                </option>

                <option value="maintenance">
                  Maintenance
                </option>
              </SelectField>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-slate-800 sm:text-base">
                  Features
                </label>

                <Input
                  name="features"
                  value={form.features}
                  onChange={handleChange}
                  placeholder="AC, Music System, Airbags, GPS"
                  className="h-auto rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-gray-400 focus-visible:border-red-400 focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:ring-offset-0 sm:py-3 sm:text-base"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Features ko comma se separate karo.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-slate-800 sm:text-base">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Enter detailed vehicle information..."
                  className="w-full rounded-xl border bg-white p-4 text-sm text-slate-900 outline-none placeholder:text-gray-400 transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100 sm:text-base"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                  Vehicle Image
                </label>

                <div className="grid gap-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4 sm:p-6 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Current image
                    </p>

                    {oldImage ? (
                      <img
                        src={getImageUrl(oldImage)}
                        alt={form.vehicleName}
                        className="h-52 w-full rounded-2xl border bg-white object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-52 items-center justify-center rounded-2xl border bg-white text-sm text-slate-400">
                        No current image
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                      New image preview
                    </p>

                    {preview ? (
                      <img
                        src={preview}
                        alt="New vehicle preview"
                        className="h-52 w-full rounded-2xl border bg-white object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-52 flex-col items-center justify-center rounded-2xl border bg-white text-center text-slate-400">
                        <ImagePlus size={34} />

                        <p className="mt-2 text-sm font-semibold">
                          New image optional
                        </p>

                        <p className="mt-1 text-xs">
                          Select nahi karoge to old image rahegi
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="h-auto cursor-pointer rounded-xl border bg-white px-4 py-2 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:px-3 file:py-1 file:text-xs file:font-bold file:text-red-700 hover:file:bg-red-100 focus-visible:border-red-400 focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:ring-offset-0 sm:text-base"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      JPG, PNG aur WEBP allowed. Maximum size 5 MB.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-col-reverse gap-3 md:col-span-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    navigate("/admin/manage-vehicles")
                  }
                  className="rounded-xl px-7 py-5 font-bold"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={updating}
                  className="rounded-xl bg-red-500 px-8 py-5 text-base font-bold text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating
                    ? "Updating Vehicle..."
                    : "Update Vehicle"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  min,
}) {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-semibold text-slate-800 sm:text-base">
        {label}
      </label>

      <Input
        name={name}
        type={type}
        min={min}
        value={value}
        onChange={onChange}
        required
        className="h-auto rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-gray-400 focus-visible:border-red-400 focus-visible:ring-2 focus-visible:ring-red-100 focus-visible:ring-offset-0 sm:py-3 sm:text-base"
      />
    </div>
  )
}

function SelectField({
  label,
  name,
  value,
  onChange,
  children,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-800 sm:text-base">
        {label}
      </label>

      <div className="flex items-center rounded-xl border bg-white px-1 transition-all focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none sm:py-3 sm:text-base"
        >
          {children}
        </select>
      </div>
    </div>
  )
}