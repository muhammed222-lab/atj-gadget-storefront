
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();
  
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
    
    // For demo purposes, allow any email/password with simple validation
    if (email && password.length >= 6) {
      // Generate a random user ID
      const userId = Math.random().toString(36).substring(2, 15);
      
      // Extract name from email (before the @)
      const namePart = email.split('@')[0];
      const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      
      const newUser: User = {
        id: userId,
        email: email,
        name: name,
        isAdmin: false,
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      
      // Store in localStorage
      localStorage.setItem('atj-user', JSON.stringify(newUser));
      
      // Show success message
      toast({
        title: "Login successful",
        description: `Welcome, ${name}!`,
      });
      
      return true;
    }
    
    return false;
  };
  
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // For demo purposes, allow any valid signup
    if (name && email && password.length >= 6) {
      // Generate a random user ID
      const userId = Math.random().toString(36).substring(2, 15);
      
      const newUser: User = {
        id: userId,
        email: email,
        name: name,
        isAdmin: false,
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      
      // Store in localStorage
      localStorage.setItem('atj-user', JSON.stringify(newUser));
      
      // Show success message
      toast({
        title: "Account created",
        description: `Welcome, ${name}!`,
      });
      
      return true;
    }
    
    return false;
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('atj-user');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
