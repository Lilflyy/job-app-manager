import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../supabaseConfig/supabase";

// Define user type
interface User {
  id: string;
  email: string;
  displayName?: string;
}

// Define context state
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user details
  const fetchUser = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      setUser(null);
    } else if (data?.user) {
      setUser({
        id: data.user.id,
        email: data.user.email ?? "",
        displayName: data.user.user_metadata?.display_name || "User",
      });
    }
    setIsLoading(false);
  };

  // Listen for authentication state changes (auto-update user state)
  useEffect(() => {
    fetchUser(); // Fetch user on mount

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        console.log("User session updated:", session.user);
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          displayName: session.user.user_metadata?.display_name || "User",
        });
      } else {
        setUser(null);
      }
    });

    return () => authListener?.subscription.unsubscribe();
  }, []);

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
