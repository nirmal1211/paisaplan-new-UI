import React from "react";
import { Search, MapPin, Heart, X } from "lucide-react";
import { Policy, Hospital } from "../types";

interface HospitalsProps {
  policy: Policy;
  searchQuery: string;
  selectedSpecialty: string;
  onSearchQueryChange: (query: string) => void;
  onSelectedSpecialtyChange: (specialty: string) => void;
}

const Hospitals: React.FC<HospitalsProps> = ({
  policy,
  searchQuery,
  selectedSpecialty,
  onSearchQueryChange,
  onSelectedSpecialtyChange,
}) => {
  // Filter hospitals based on search and specialty
  const filteredHospitals =
    policy.hospitals?.filter((hospital: Hospital) => {
      const matchesSearch =
        searchQuery === "" ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.specialties.some((s: string) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesSpecialty =
        selectedSpecialty === "all" ||
        hospital.specialties.includes(selectedSpecialty);
      return matchesSearch && matchesSpecialty;
    }) || [];

  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(policy.hospitals?.flatMap((h: Hospital) => h.specialties) || [])
  ).sort();

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div
        className="rounded-xl shadow-lg p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "var(--color-muted)" }}
            />
            <input
              type="text"
              placeholder="Search hospitals by name, city, or specialty..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded-lg font-roboto text-xs focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
                fontSize: "0.85rem",
              }}
            />
          </div>
          <div className="flex gap-1">
            <div className="relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => onSelectedSpecialtyChange(e.target.value)}
                className="appearance-none border rounded-lg px-3 py-2 pr-7 font-roboto text-xs focus:outline-none focus:ring-2 transition-all min-w-36"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  fontSize: "0.85rem",
                }}
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            {searchQuery && (
              <button
                onClick={() => onSearchQueryChange("")}
                className="px-2 py-2 border rounded-lg text-xs transition-all duration-200 hover:shadow-md"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                  fontSize: "0.85rem",
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hospital List */}
      <div
        className="rounded-xl shadow-lg p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-md font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)", fontSize: "1rem" }}
        >
          <MapPin
            className="h-4 w-4"
            style={{ color: "var(--color-primary)" }}
          />
          <span style={{ fontSize: "0.95rem" }}>
            Network Hospitals ({filteredHospitals.length})
          </span>
        </h3>

        {filteredHospitals.length === 0 ? (
          <div className="text-center py-8">
            <MapPin
              className="h-10 w-10 mx-auto mb-3"
              style={{ color: "var(--color-muted)" }}
            />
            <h4
              className="text-base font-semibold font-poppins mb-1"
              style={{ color: "var(--color-foreground)", fontSize: "0.95rem" }}
            >
              No hospitals found
            </h4>
            <p
              className="font-roboto text-xs"
              style={{ color: "var(--color-muted)" }}
            >
              Try adjusting your search criteria or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHospitals.map((hospital: Hospital) => (
              <div
                key={hospital.id}
                className="border rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-start space-x-2 mb-3">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Heart
                      className="h-4 w-4"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-0.5">
                      <h4
                        className="font-semibold font-poppins text-xs"
                        style={{
                          color: "var(--color-foreground)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {hospital.name}
                      </h4>
                      {hospital.cashless && (
                        <span className="px-1.5 py-0.5 text-[10px] font-roboto rounded-full bg-green-100 text-green-800 border border-green-200">
                          Cashless
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs font-roboto flex items-center space-x-1"
                      style={{
                        color: "var(--color-muted)",
                        fontSize: "0.8rem",
                      }}
                    >
                      <MapPin className="h-3 w-3" />
                      <span>
                        {hospital.city} • {hospital.distance}
                      </span>
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="flex items-center space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-[10px] ${
                              i < Math.floor(hospital.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span
                        className="text-[10px] font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {hospital.rating}/5
                      </span>
                      <span
                        className="px-1.5 py-0.5 text-[10px] font-roboto rounded-full"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {hospital.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p
                    className="text-[10px] font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Specialties
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 text-[9px] font-roboto rounded"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {specialty}
                      </span>
                    ))}
                    {hospital.specialties.length > 3 && (
                      <span
                        className="px-1.5 py-0.5 text-[9px] font-roboto rounded"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-muted)",
                        }}
                      >
                        +{hospital.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <p
                    className="text-[10px] font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    📍 {hospital.address}
                  </p>
                  <p
                    className="text-[10px] font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    📞 {hospital.phone}
                  </p>
                </div>

                {hospital.emergency && (
                  <div className="mt-2">
                    <span className="px-2 py-1 text-[10px] font-roboto rounded bg-red-100 text-red-800 border border-red-200">
                      24x7 Emergency
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hospitals;
