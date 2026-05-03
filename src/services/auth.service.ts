import { delay } from "../utils/delay";

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  country: string;
  kycStatus: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  kycStatus: string;
  password: string; // Added password to user type  
};

const MOCK_OTP = "123456";

const USER_KEY = "user";
const TOKEN_KEY = "token";

const API_URL = "http://localhost:5000"; // URL for json-server (adjust as needed)

export const AuthService = {
  // -------------------------
  // SIGNUP
  // -------------------------
  async signup(payload: SignupPayload) {
    await delay(600);

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    console.log("New user created:", payload);

    return {
      success: true,
      message: "OTP sent to registered email",
    };
  },

  // -------------------------
  // OTP VERIFICATION
  // -------------------------
  async verifyOtp(otp: string) {
    await delay(500);
    return otp === MOCK_OTP;
  },

  // -------------------------
  // LOGIN
  // -------------------------
  async login(payload: LoginPayload): Promise<{
    token: string;
    user: User;
  }> {
    await delay(700);

    const response = await fetch(`${API_URL}/users?email=${payload.email}&password=${payload.password}`);

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const users: User[] = await response.json();

    if (users.length === 0) {
      throw new Error("Invalid credentials");
    }

    const user = users[0];

    return {
      token: "mock-jwt-token-123", 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        kycStatus: user.kycStatus,
        password: user.password // Include password in the returned user object
      },
    };
  },

  // -------------------------
  // SESSION MANAGEMENT (SESSION STORAGE)
  // -------------------------
  setSession(user: User, token: string) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  getSession(): { user: User | null; token: string | null } {
    const user = sessionStorage.getItem(USER_KEY);
    const token = sessionStorage.getItem(TOKEN_KEY);
    return { user: user ? JSON.parse(user) : null, token };
  },

  // -------------------------
  // NEW: GET USER
  // -------------------------
  getUser(): User | null {
    const { user } = this.getSession();  // Simply extract the user from the session data
    return user;
  },

  // -------------------------
  // UPDATE USER DETAILS
  // -------------------------
  async updateUser(updatedUser: User) {
    // Update the session storage with the new user data
    sessionStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    // Update the user in the mock backend (db.json)
    const response = await fetch(`${API_URL}/users/${updatedUser.id}`, {
      method: "PUT", // Use PATCH if you're only updating certain fields
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error("Failed to update user in DB");
    }

    const updatedUserInDb = await response.json();
    console.log("User updated in DB:", updatedUserInDb);
  },

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(TOKEN_KEY);
  },

  logout() {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },
};