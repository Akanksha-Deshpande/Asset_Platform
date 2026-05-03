import type { Property } from "../../types/property.types";
import PropertyCard from "./PropertyCard";

type PropertyGridProps = {
  properties: Property[];
  onViewProperty?: (id: string) => void;
};

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onViewProperty
}) => {
  if (!properties.length) {
    return (
      <div className="text-center text-muted mt-4">
        No properties found.
      </div>
    );
  }

  return (
    <div className="row g-4">
      {properties.map((property) => (
        <div key={property.id} className="col-md-4">
          <PropertyCard
            property={property}
            onView={onViewProperty}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;