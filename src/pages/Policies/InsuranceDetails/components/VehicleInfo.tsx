import React from "react";
import { Car, Shield, Calendar, CheckCircle } from "lucide-react";
import { Policy } from "../types";

interface VehicleInfoProps {
  policy: Policy;
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({ policy }) => {
  if (!policy.vehicle) {
    return (
      <div className="text-center py-8">
        <Car
          className="h-12 w-12 mx-auto mb-4"
          style={{ color: "var(--color-muted)" }}
        />
        <p style={{ color: "var(--color-muted)" }}>
          No vehicle information available
        </p>
      </div>
    );
  }

  const { vehicle } = policy;

  return (
    <div className="space-y-6">
      {/* Vehicle Overview Card */}
      <div
        className="rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        {/* Vehicle Header */}
        <div
          className="p-6 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-poppins">
                    {vehicle.make} {vehicle.model}
                  </h1>
                  <p className="text-white/80 font-roboto">
                    {vehicle.year} • {vehicle.variant}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 font-roboto text-sm">
                  Registration No.
                </p>
                <p className="text-lg font-bold font-poppins">
                  {vehicle.registrationNumber}
                </p>
              </div>
            </div>

            {/* Key Vehicle Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Car className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Engine
                  </span>
                </div>
                <p className="text-sm font-bold font-poppins">
                  {vehicle.engineCapacity}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Fuel
                  </span>
                </div>
                <p className="text-sm font-bold font-poppins">
                  {vehicle.fuelType}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Mileage
                  </span>
                </div>
                <p className="text-sm font-bold font-poppins">
                  {vehicle.mileage}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Status
                  </span>
                </div>
                <p className="text-sm font-bold font-poppins">
                  {vehicle.rcStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Vehicle Information */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-lg font-bold font-poppins mb-6 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Car
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Vehicle Details</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Make & Model
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.make} {vehicle.model}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Year of Manufacture
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.year}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Variant
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.variant}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Body Type
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.bodyType}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Color
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.color}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Seating Capacity
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.seatingCapacity} Seater
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Transmission
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.transmission}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Max Speed
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.maxSpeed}
              </p>
            </div>
          </div>
        </div>

        {/* Engine & Technical Details */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-lg font-bold font-poppins mb-6 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Shield
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Technical Specifications</span>
          </h3>
          <div className="space-y-4">
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Engine Number
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.engineNumber}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Chassis Number
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.chassisNumber}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Engine Capacity
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.engineCapacity}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Fuel Type
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.fuelType}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Mileage
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {vehicle.mileage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;
