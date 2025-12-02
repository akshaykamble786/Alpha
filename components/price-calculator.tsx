"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { BarChart3, X } from "lucide-react"

interface PriceCalculatorProps {
  basePrice: number
}

export default function PriceCalculator({ basePrice }: PriceCalculatorProps) {
  const [numberOfInvites, setNumberOfInvites] = useState(50)
  const [durationOfEvent, setDurationOfEvent] = useState(3)

  // Formula: calculatedValue = numberOfInvites * durationOfEvent * 10
  const calculatedValue = useMemo(() => {
    return numberOfInvites * durationOfEvent * 10
  }, [numberOfInvites, durationOfEvent])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900">Price Calculator</CardTitle>
        <Button variant="ghost" size="icon" className="text-gray-400 h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Number of Invites Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Number of Invites</span>
            <span className="text-lg font-semibold text-purple-600">{numberOfInvites}</span>
          </div>
          <Slider
            value={[numberOfInvites]}
            onValueChange={(value) => setNumberOfInvites(value[0])}
            min={10}
            max={200}
            step={5}
            className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600 [&_.bg-primary]:bg-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>10</span>
            <span>200</span>
          </div>
        </div>

        {/* Duration of Event Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Duration of Event</span>
            <span className="text-lg font-semibold text-purple-600">
              {durationOfEvent} {durationOfEvent === 1 ? "Hour" : "Hours"}
            </span>
          </div>
          <Slider
            value={[durationOfEvent]}
            onValueChange={(value) => setDurationOfEvent(value[0])}
            min={1}
            max={12}
            step={1}
            className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600 [&_.bg-primary]:bg-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>1 Hour</span>
            <span>12 Hours</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Calculated Value Display */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Estimated Value</p>
          <p className="text-4xl font-bold text-teal-600">{formatCurrency(calculatedValue)}</p>
          <p className="text-xs text-gray-400 mt-1">
            Based on {numberOfInvites} invites × {durationOfEvent} hours
          </p>
        </div>

        {/* View Breakdown Link */}
        <button className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
          <BarChart3 className="h-4 w-4" />
          View Price Breakdown
        </button>

        {/* CTA Button */}
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-base font-semibold">
          <span className="mr-2">₹</span>
          Get Quote
        </Button>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 leading-relaxed">
          *Prices may vary based on availability and specific requirements. Final quote will be provided after
          confirmation.
        </p>
      </CardContent>
    </Card>
  )
}
