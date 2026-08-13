import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Temporary role for testing.
  // Change this to "qa" when testing the QA account.
  const [role, setRole] = useState("dev"); // "dev" or "qa"

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}