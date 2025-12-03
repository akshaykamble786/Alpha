import ImageCarousel from "@/components/image-carousel"
import Car360View from "@/components/car-360-view"
import CarOverview from "@/components/car-overview"
import PriceCalculator from "@/components/price-calculator"
import { Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock car data based on Spinny reference
const carData = {
  model: "Mahindra Thar LX 4 Str Hard Top Diesel",
  variant: "MT 4WD",
  year: 2021,
  mileage: "18,000 km",
  price: 1326000,
  location: "Malad East, Mumbai",
  fuelType: "Diesel",
  transmission: "Manual",
  ownership: "1st Owner",
  engineCapacity: "2184 cc",
  groundClearance: "226 mm",
  seatingCapacity: "4",
  bootSpace: "339 L",
  fuelTankCapacity: "57 L",
  frontTyreSize: "255/65 R17",
  displacement: "2184 cc",
  images: [
    "/front.avif",
    "/front-815.avif",
    "/front-920.avif",
    "/back.avif",
    "/back-340.avif",
    "/back-440.avif",
    "/dash.avif",
    "/clutch.avif",
    "/steering.avif",
    "/rad.avif",
    "/int.avif",
    "/out.avif",
  ],
}

export default function CarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 text-balance">{carData.model}</h1>
              <p className="text-sm text-gray-500">{carData.variant}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image Carousel & Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Carousel with 360 View Button */}
            <div className="relative">
              <ImageCarousel images={carData.images} />
              <Car360View />
            </div>

            {/* Car Overview */}
            <CarOverview carData={carData} />
          </div>

          {/* Right Column - Price Calculator */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PriceCalculator basePrice={carData.price} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
