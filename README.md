# Asset Platform

This project was created to build a core frontend experience covering investor onboarding and property listing, using a component-driven approach aligned with a shared Bootstrap-based design system.

It is a regulated investment platform where users sign up, get verified, and browse investment opportunities. The platform is focused on the investor user (Phase 1) for now.

## Technologies Used:

React with Vite

TypeScript

Bootstrap

JSON Server (For Mock APIs)

## Features:
Onboarding Flow: Sign up, email/OTP verification, and login process.

Property Listing Page: Display of investment opportunities, property filters, and responsive property cards.

## 📦 Installation

1. :**Clone the repo::**
```bash
  git clone https://github.com/Akanksha-Deshpande/Asset_Platform.git
  cd Asset_Platform

2. :**Install dependencies::**
```bash
  npm install

3. :**Run JSON-Server (For Mock APIs)::**
  ```bash
  npm install -g json-server
  json-server --watch db.json --port 5000
  # (Do not kill this terminal)

4. :**Run the app::**
```bash
  npm run dev
  # (Run on another terminal)

5. **Visit the application:**
```bash
  Go to http://localhost:5173 (or the URL provided by Vite) to see the app running.

5. **Login Credentials Default:**
  ```bash
  Email: example2@gmail.com
  Password: aceg1234 


# Additional Notes:

Mock API: The backend is simulated using JSON Server with db.json. Any changes to the mock data should be made in this file. You can expand the dataset as needed for testing.

Responsive Design: The app is fully responsive using Bootstrap. Check the layout on different screen sizes for optimal experience.

### Next Steps: Future improvements can include pagination, lazy loading, and better handling of large datasets and white labeling.