import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role:
    | "retail_customer"
    | "corporate_employee"
    | "hr_admin"
    | "underwriter"
    | "underwriter_admin"
    | "relationship_manager";
  avatar?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data based on email
      const mockUsers: Record<string, User> = {
        "customer@example.com": {
          id: "1",
          name: "John Customer",
          email: "customer@example.com",
          role: "retail_customer",
          avatar:
            "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        },
        "employee@company.com": {
          id: "2",
          name: "Jane Employee",
          email: "employee@company.com",
          role: "corporate_employee",
          company: "TechCorp Inc.",
          avatar:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        },
        "hr@company.com": {
          id: "3",
          name: "Sarah HR Manager",
          email: "hr@company.com",
          role: "hr_admin",
          company: "TechCorp Inc.",
          avatar:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        },
        "underwriter@insurer.com": {
          id: "4",
          name: "Mike Underwriter",
          email: "underwriter@insurer.com",
          role: "underwriter",
          avatar:
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        },
        "admin@insurer.com": {
          id: "5",
          name: "Lisa Admin",
          email: "admin@insurer.com",
          role: "underwriter_admin",
          avatar:
            "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        },
        "rm@insurer.com": {
          id: "6",
          name: "David Rodriguez",
          email: "rm@insurer.com",
          role: "relationship_manager",
          avatar:
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        },
      };

      const userData = mockUsers[email];
      if (userData && password === "password") {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
