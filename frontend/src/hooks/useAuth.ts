import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
    // Get the authentication context using the useContext hook
  const context = useContext(AuthContext);

  // If the context is undefined, throw an error indicating that useAuth must be used within an AuthProvider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Return the authentication context
  return context;
}
