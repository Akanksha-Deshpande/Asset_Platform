import type { PropertyFilters } from "../../types/property.types";
import { useState } from "react";

type FilterPanelProps = {
  onFilterChange: (filters: PropertyFilters) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilterChange
}) => {
  const [filters, setFilters] = useState<PropertyFilters>({
    location: "",
    minPrice: undefined,
    maxPrice: undefined,
    minYield: undefined
  });

  const handleChange = (
    key: keyof PropertyFilters,
    value: string | number | undefined
  ) => {
    const updatedFilters = {
      ...filters,
      [key]: value === "" ? undefined : value
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h5 className="mb-3">Filters</h5>

      <div className="row g-3">
        
        {/* Location */}
        <div className="col-md-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. London"
            value={filters.location || ""}
            onChange={(e) =>
              handleChange("location", e.target.value)
            }
          />
        </div>

        {/* Min Price */}
        <div className="col-md-3">
          <label className="form-label">Min Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="£"
            value={filters.minPrice || ""}
            onChange={(e) =>
              handleChange(
                "minPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>

        {/* Max Price */}
        <div className="col-md-3">
          <label className="form-label">Max Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="£"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              handleChange(
                "maxPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>

        {/* Min Yield */}
        <div className="col-md-3">
          <label className="form-label">Min Yield (%)</label>
          <input
            type="number"
            className="form-control"
            placeholder="%"
            value={filters.minYield || ""}
            onChange={(e) =>
              handleChange(
                "minYield",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>

      </div>
    </div>
  );
};

export default FilterPanel;