import React, { createContext, useContext, useState,  } from "react";
import type { ReactNode } from "react";

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  password: string; // Added password to user type
  kycStatus: string; // Added KYC status to user type
}

// Define the AuthContext type, which will now include `updateUserProfile`
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUserProfile: (user: User) => void; // Method to update user profile
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing user session in localStorage (if any)
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set the user from localStorage
    }
  }, []);

  // Login method
  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
  };

  // Logout method
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  // Method to update user profile
  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser); // Update the user in the context
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Store updated user in localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};