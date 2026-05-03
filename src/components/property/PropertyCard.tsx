import type { Property } from "../../types/property.types";
import FinancialSummaryCard  from "./FinancialSummaryCard";
import Badge from "../ui/Badge";
import ImageGallery from "./ImageGallery";
import propertyImage1 from "../../assets/images/property1.jpeg";
import propertyImage2 from "../../assets/images/property2.jpeg";
import propertyImage3 from "../../assets/images/property3.jpeg";

type PropertyCardProps = {
  property: Property;
  onView?: (id: string) => void;
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onView
}) => {
  const handleView = () => {
    if (onView) {
      onView(property.id);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      
      {/* Image */}
      <ImageGallery images={[propertyImage1, propertyImage2, propertyImage3]} alt={property.title} style={{ height: "250px", objectFit: "cover" }} />

      <div className="card-body d-flex flex-column">
        
        {/* Title + Location */}
        <h5 className="card-title mb-1">{property.title}</h5>
        <p className="text-muted small mb-2">{property.location}</p>

        {/* Optional Badge */}
        {property.yield >= 7 && (
          <div className="mb-2">
            <Badge label="High Yield" variant="success" />
          </div>
        )}

        {/* Financial Summary */}
        <div className="mb-3">
          <FinancialSummaryCard
            price={property.price}
            yield={property.yield}
          />
        </div>

        {/* Spacer to push button down */}
        <div className="mt-auto">
          <button
            className="btn btn-outline-primary w-100"
            onClick={handleView}
          >
            View Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;