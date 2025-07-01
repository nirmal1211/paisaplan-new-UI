import React, { useState } from 'react';
import { Search, MapPin, Phone, Star, Navigation, Filter } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  specialties: string[];
  rating: number;
  distance: string;
  cashless: boolean;
}

interface NetworkHospitalsMobileProps {
  hospitals: Hospital[];
}

const NetworkHospitalsMobile: React.FC<NetworkHospitalsMobileProps> = ({ hospitals }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(hospitals.flatMap(h => h.specialties))
  ).sort();

  // Filter hospitals based on search and specialty
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = searchQuery === '' || 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === 'all' || 
      hospital.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="hospitals-container">
      <h2 className="text-lg font-bold mb-medium" style={{ color: 'var(--color-foreground)' }}>
        Network Hospitals
      </h2>
      
      {/* Search Bar */}
      <div className="hospital-search-bar">
        <input
          type="text"
          placeholder="Search hospitals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="hospital-search-input"
        />
        <Search className="hospital-search-icon h-5 w-5" />
      </div>

      {/* Specialty Filter */}
      <div className="mb-medium">
        <div className="relative">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            style={{ 
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-foreground)'
            }}
          >
            <option value="all">All Specialties</option>
            {allSpecialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none" 
                  style={{ color: 'var(--color-muted)' }} />
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="hospital-cards-grid">
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="hospital-name">{hospital.name}</h3>
                <p className="hospital-address">
                  {hospital.address}, {hospital.city}
                </p>
                <p className="hospital-contact">
                  {hospital.state} - {hospital.pincode}
                </p>
              </div>
              {hospital.cashless && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Cashless
                </span>
              )}
            </div>

            {/* Rating and Distance */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(hospital.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm ml-1" style={{ color: 'var(--color-muted)' }}>
                  {hospital.rating}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  {hospital.distance}
                </span>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
                Specialties:
              </h4>
              <div className="flex flex-wrap gap-1">
                {hospital.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    {specialty}
                  </span>
                ))}
                {hospital.specialties.length > 3 && (
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    +{hospital.specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="touch-button touch-button-primary flex-1">
                <Phone className="h-4 w-4" />
                Call Hospital
              </button>
              <button className="touch-button touch-button-secondary">
                <Navigation className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredHospitals.length === 0 && (
        <div className="text-center py-8">
          <div className="p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center" 
               style={{ backgroundColor: 'var(--color-secondary)' }}>
            <MapPin className="h-6 w-6" style={{ color: 'var(--color-muted)' }} />
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
            No Hospitals Found
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            No hospitals match your search criteria. Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default NetworkHospitalsMobile;