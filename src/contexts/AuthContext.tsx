
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('atj-user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(userData.isAdmin);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, hardcoded admin credentials
    if (email === 'jessica@admin.com' && password === '@jessicaA1') {
      const adminUser: User = {
        id: 'admin-1',
        email: 'jessica@admin.com',
        name: 'Jessica Admin',
        isAdmin: true,
      };
      
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      
      // Store in localStorage
      localStorage.setItem('atj-user', JSON.stringify(adminUser));
      return true;
    }
    
    // For demo purposes, always reject other login attempts
    return false;
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('atj-user');
  };
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
