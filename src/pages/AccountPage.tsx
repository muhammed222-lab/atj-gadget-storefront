
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Package, ShoppingCart, Settings, LogOut, Edit, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const AccountPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleEditProfile = () => {
    toast({
      title: "Feature coming soon",
      description: "Profile editing will be available in a future update.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Create initials for avatar
  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Account Header with Avatar */}
          <div className="bg-gradient-to-r from-atj-light to-atj rounded-xl p-6 md:p-8 mb-8 text-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarFallback className="text-2xl bg-atj-accent text-white">{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold">{user?.name || 'User'}</h1>
                <p className="text-white/80">{user?.email || 'email@example.com'}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                    onClick={handleEditProfile}
                  >
                    <Edit size={16} className="mr-2" /> Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" /> Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 p-1 bg-white shadow rounded-lg">
              <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
                <User size={18} />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2 py-3">
                <Package size={18} />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2 py-3">
                <ShoppingCart size={18} />
                <span>Wishlist</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white shadow-sm border-none hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <User size={18} className="mr-2 text-atj" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Your account details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-500">Full Name</p>
                          <p className="font-medium text-gray-900 mt-1">{user?.name || 'User'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-500">Email Address</p>
                          <p className="font-medium text-gray-900 mt-1">{user?.email || 'email@example.com'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-500">Account Type</p>
                          <p className="font-medium text-gray-900 mt-1">
                            {user?.isAdmin ? 'Administrator' : 'Customer'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t pt-4">
                    <Button 
                      variant="outline" 
                      className="hover:bg-atj hover:text-white"
                      onClick={handleEditProfile}
                    >
                      Edit Profile
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-white shadow-sm border-none hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Settings size={18} className="mr-2 text-atj" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer flex justify-between items-center">
                        <div>
                          <p className="font-medium">Password & Security</p>
                          <p className="text-sm text-gray-500">Update your password and security settings</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                      
                      <div className="p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer flex justify-between items-center">
                        <div>
                          <p className="font-medium">Notifications</p>
                          <p className="text-sm text-gray-500">Configure email and app notifications</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                      
                      <div className="p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer flex justify-between items-center">
                        <div>
                          <p className="font-medium">Address Information</p>
                          <p className="text-sm text-gray-500">Add or update your shipping addresses</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Package size={18} className="mr-2 text-atj" />
                    Order History
                  </CardTitle>
                  <CardDescription>View all your previous orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Package size={64} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-gray-700">You haven't placed any orders yet.</p>
                    <p className="text-gray-500 mt-2">Orders will appear here after you make a purchase.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-atj hover:bg-atj-light" 
                    onClick={() => navigate('/products')}
                  >
                    Browse Products
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="wishlist">
              <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <ShoppingCart size={18} className="mr-2 text-atj" />
                    My Wishlist
                  </CardTitle>
                  <CardDescription>Products you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-gray-700">Your wishlist is empty.</p>
                    <p className="text-gray-500 mt-2">Add items to your wishlist while browsing our products.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-atj hover:bg-atj-light" 
                    onClick={() => navigate('/products')}
                  >
                    Browse Products
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
