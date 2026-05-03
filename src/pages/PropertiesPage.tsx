import { useEffect, useState } from "react";
import FilterPanel from "../components/property/FilterPanel";
import PropertyGrid from "../components/property/PropertyGrid";
import type { Property, PropertyFilters } from "../types/property.types";
import { PropertyService } from "../services/property.service";
import { useNavigate } from "react-router-dom";



const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initial fetch
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await PropertyService.getAll();
      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      console.error("Error fetching properties", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const handleFilterChange = (filters: PropertyFilters) => {
    let result = [...properties];

    if (filters.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.minYield !== undefined) {
      result = result.filter((p) => p.yield >= filters.minYield!);
    }

    setFilteredProperties(result);
  };

  const handleViewProperty = (id: string) => {
    console.log("View property:", id);
   navigate(`/properties/${id}`);
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">Investment Opportunities</h3>

      {/* Filters */}
      <FilterPanel onFilterChange={handleFilterChange} />

      {/* Loading */}
      {loading ? (
        <div className="text-center mt-4">Loading properties...</div>
      ) : (
        <PropertyGrid
          properties={filteredProperties}
          onViewProperty={handleViewProperty}
        />
      )}

    </div>
  );
};

export default PropertiesPage;