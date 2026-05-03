import type { Property } from "../types/property.types";
import { delay } from "../utils/delay";

// Mock API URL for json-server, ensure it's running
const API_URL = "http://localhost:5000/properties";

export const PropertyService = {
  // -------------------------
  // GET ALL PROPERTIES
  // -------------------------
  async getAll(): Promise<Property[]> {
    await delay(600);

    try {
      // Fetch the properties from the mock API (json-server)
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const properties: Property[] = await response.json();
      return properties;
    } catch (error) {
      console.error("Error fetching properties:", error);
      return []; // Return an empty array in case of error
    }
  },

  // -------------------------
  // GET PROPERTY BY ID
  // -------------------------
  async getById(id: string): Promise<Property | null> {
    await delay(400);

    try {
      // Fetch a single property by its ID from the mock API (json-server)
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch property");
      }
      const property: Property = await response.json();
      return property || null;
    } catch (error) {
      console.error("Error fetching property by ID:", error);
      return null;
    }
  }
};