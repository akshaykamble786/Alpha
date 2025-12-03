"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  User,
  MapPin,
  Car,
  Sofa,
  Space,
  AlignVerticalSpaceAround,
  ShipWheel,
} from "lucide-react"

export default function CarOverview({ carData }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const specs = [
    { icon: Calendar, label: "Year", value: carData.year.toString() },
    { icon: Gauge, label: "Mileage", value: carData.mileage },
    { icon: Fuel, label: "Fuel Type", value: carData.fuelType },
    { icon: Settings2, label: "Transmission", value: carData.transmission },
    { icon: User, label: "Ownership", value: carData.ownership },
    { icon: Car, label: "Engine", value: carData.engineCapacity },
    { icon: AlignVerticalSpaceAround, label: "Ground Clearance", value: carData.groundClearance },
    { icon: Sofa, label: "Seating Capacity", value: carData.seatingCapacity.toString() },
    { icon: Space, label: "Boot Space", value: carData.bootSpace },
    { icon: Fuel, label: "Fuel Tank Capacity", value: carData.fuelTankCapacity },
    { icon: ShipWheel, label: "Front Tyre Size", value: carData.frontTyreSize },
    { icon: ShipWheel, label: "Displacement", value: carData.displacement },
  ]

  return (
    <div className="space-y-4">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Fixed on road price</p>
              <div className="flex items-baseline">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{formatPrice(carData.price)}</p>
                <span className="text-sm ml-2">+ 1% TCS</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{carData.location}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 sm:ml-4 mt-4 sm:mt-0">
              <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">Vroomly Assured</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900">Car Overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <spec.icon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{spec.label}</p>
                  <p className="text-sm font-medium text-gray-900">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900">Key Highlights</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
              Fixed Price
            </Badge>
            <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">
              5-Day Return
            </Badge>
            <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
              Free RC Transfer
            </Badge>
            <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">
              1 Year Warranty
            </Badge>
            <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
              200+ Checkpoints
            </Badge>
            <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">
              Comprehensive Insurance
            </Badge>
            <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
              Cruise Control
            </Badge>
            <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">
              Integrated (in-dash) music system
            </Badge>
            <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">
              Apple car play / android auto
            </Badge>
            <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">
              Touch screen infotainment system
            </Badge>
            <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">
              GPS navigation system
            </Badge>
            <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
              Driver height adjustable seat
            </Badge>
            <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
              Steering mounted controls
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
