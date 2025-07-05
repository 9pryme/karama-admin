"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Users, Baby, Heart, MapPin, Phone, Mail, Calendar, DollarSign, Eye, AlertCircle, Loader2 } from "lucide-react";
import { useUsers } from "@/hooks/use-users";
import { User } from "@/lib/services/user";

export default function UsersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Use React Query to fetch users
  const { data: users, isLoading, error, isError } = useUsers();

  const handleViewDetails = (userId: string) => {
    router.push(`/dashboard/users/${userId}`);
  };

  // Memoize filtered users for performance
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    
    // The service now properly returns families, caregivers, and newUsers arrays
    const families = Array.isArray(users.families) ? users.families : [];
    const caregivers = Array.isArray(users.caregivers) ? users.caregivers : [];
    const newUsers = Array.isArray(users.newUsers) ? users.newUsers : [];
    const allUsers = [...families, ...caregivers, ...newUsers];
    
    return allUsers.filter(user => {
      const matchesSearch = searchTerm === "" || 
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.phone_number.includes(searchTerm) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.family_profile?.location && user.family_profile.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.caregiver_profile?.location && user.caregiver_profile.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTab = activeTab === "all" || 
        (activeTab === "families" && user.role === "FAMILY") ||
        (activeTab === "caregivers" && user.role === "CAREGIVER") ||
        (activeTab === "new-users" && user.role === "NEW_USER");
      
      return matchesSearch && matchesTab;
    });
  }, [users, searchTerm, activeTab]);

  // Memoize stats for performance
  const stats = useMemo(() => {
    if (!users) return { total: 0, families: 0, caregivers: 0, newUsers: 0 };
    
    const families = Array.isArray(users.families) ? users.families : [];
    const caregivers = Array.isArray(users.caregivers) ? users.caregivers : [];
    const newUsers = Array.isArray(users.newUsers) ? users.newUsers : [];
    
    return {
      total: families.length + caregivers.length + newUsers.length,
      families: families.length,
      caregivers: caregivers.length,
      newUsers: newUsers.length
    };
  }, [users]);

  const getUserLocation = (user: User) => {
    return user.family_profile?.location || user.caregiver_profile?.location || "Not specified";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage families and caregivers on the platform
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage families and caregivers on the platform
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div>
              <p className="text-lg font-semibold">Failed to load users</p>
              <p className="text-muted-foreground">
                {error?.message || "An unexpected error occurred"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage families and caregivers on the platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Active users on platform
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Families</CardTitle>
            <Baby className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.families}</div>
            <p className="text-xs text-muted-foreground">
              Registered families
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Caregivers</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.caregivers}</div>
            <p className="text-xs text-muted-foreground">
              Active caregivers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newUsers}</div>
            <p className="text-xs text-muted-foreground">
              Pending setup
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, email, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Users ({stats.total})</TabsTrigger>
              <TabsTrigger value="families">Families ({stats.families})</TabsTrigger>
              <TabsTrigger value="caregivers">Caregivers ({stats.caregivers})</TabsTrigger>
              <TabsTrigger value="new-users">New Users ({stats.newUsers})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="text-muted-foreground">
                      {searchTerm ? "No users found matching your search." : "No users available."}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.user_id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profile_picture?.path} alt={user.name || user.phone_number} />
                          <AvatarFallback className="text-xs">
                            {user.name ? user.name.split(' ').map((n: string) => n[0]).join('') : user.phone_number.slice(-2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name || user.phone_number}</div>
                          <div className="text-sm text-muted-foreground">{user.phone_number}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "FAMILY" ? "default" : user.role === "CAREGIVER" ? "secondary" : "destructive"}>
                        {user.role === "FAMILY" ? "Family" : user.role === "CAREGIVER" ? "Caregiver" : "New User"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{getUserLocation(user)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.activity_status === "ACTIVE" ? "default" : "secondary"}
                        className={user.activity_status === "ACTIVE" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : ""}
                      >
                        {user.activity_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.plan}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(user.user_id)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 