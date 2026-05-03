import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Property } from "../types/property.types";
import { PropertyService } from "../services/property.service";
import FinancialSummaryCard from "../components/property/FinancialSummaryCard";
import Badge from "../components/ui/Badge";

import DocumentList from "../components/property/DocumentList";
import ImageGallery from "../components/property/ImageGallery";

import propertyImage1 from "../assets/images/property1.jpeg";
import propertyImage2 from "../assets/images/property2.jpeg";
import propertyImage3 from "../assets/images/property3.jpeg";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchProperty(id);
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      const data = await PropertyService.getById(propertyId);
      setProperty(data);
    } catch (err) {
      console.error("Error fetching property", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-4">Loading property...</div>;
  }

  if (!property) {
    return (
      <div className="container mt-4 text-muted">
        Property not found.
      </div>
    );
  }

  return (
  <div className="container mt-4">

      {/* Header */}
      <div className="mb-4">
        <h3 className="mb-1">{property.title}</h3>
        <p className="text-muted">{property.location}</p>

        {property.yield >= 7 && (
          <Badge label="High Yield" variant="success" />
        )}
      </div>

      {/* Image */}
      <div className="mb-4 shadow-sm w-100 h-50 h-md-75 h-lg-100">
        <ImageGallery images={[propertyImage1, propertyImage2, propertyImage3]} alt={property.title} style={{ height: "65vh", objectFit: "cover" }} />
      </div>

      <div className="row">
        
        {/* Left: Description */}
        <div className="col-md-8">
          <div className="card p-3 shadow-sm mb-4">
            <h5>Description</h5>
            <p className="text-muted small">
              {property.description}
            </p>
          </div>

         {/* Documents */}
        <div className="card p-3 shadow-sm mt-4">
            <h5 className="mb-3">Documents</h5>

            <DocumentList
              documents={[
                {
                  id: "d1",
                  name: "Title Deed",
                  type: "PDF",
                  url: "#"
                },
                {
                  id: "d2",
                  name: "Investment Prospectus",
                  type: "PDF",
                  url: "#"
                }
              ]}
            />
        </div>

        </div>

        {/* Right: Financials */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm mb-4">
            <h5 className="mb-3">Financial Overview</h5>
            <FinancialSummaryCard
              price={property.price}
              yield={property.yield}
            />
          </div>

          {/* CTA */}
          <div className="card p-3 shadow-sm">
            <button className="btn btn-primary w-100">
              Invest Now
            </button>
          </div>

         
        
        </div>

        

      </div>
    </div>
  );
};

export default PropertyDetailPage;