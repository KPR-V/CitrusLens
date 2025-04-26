'use client'
import { useBedrockPassport } from "@bedrock_org/passport";
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AuthContextType {
  user: any;
  isLoggedIn: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoggedIn, signOut } = useBedrockPassport();
  const router = useRouter();
  const [loading, setLoading] = useState(true);



  const login = () => {
    router.push("/login");
  };

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
