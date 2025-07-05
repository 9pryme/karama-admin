"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, MoreVertical, Search, ChevronLeft, ChevronRight, Check, Users, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

const ITEMS_PER_PAGE = 10;

interface Family {
  id: string;
  family_name: string;
  email: string;
  phone: string;
  children_count: number;
  location: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  created_at: string;
  caregiver_preference: string;
  hourly_budget: number;
  verified: boolean;
}

// Mock data for families
const mockFamilies: Family[] = [
  {
    id: "FAM-001",
    family_name: "Johnson Family",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    children_count: 2,
    location: "Manhattan, NY",
    status: "ACTIVE",
    created_at: "2024-01-15T10:30:00Z",
    caregiver_preference: "Full-time",
    hourly_budget: 25,
    verified: true
  },
  {
    id: "FAM-002",
    family_name: "Davis Family",
    email: "mike.davis@email.com",
    phone: "+1 (555) 234-5678",
    children_count: 1,
    location: "Brooklyn, NY",
    status: "ACTIVE",
    created_at: "2024-01-20T14:15:00Z",
    caregiver_preference: "Part-time",
    hourly_budget: 22,
    verified: true
  },
  {
    id: "FAM-003",
    family_name: "Brown Family",
    email: "lisa.brown@email.com",
    phone: "+1 (555) 345-6789",
    children_count: 3,
    location: "Queens, NY",
    status: "PENDING",
    created_at: "2024-01-25T09:45:00Z",
    caregiver_preference: "Weekend",
    hourly_budget: 30,
    verified: false
  },
  {
    id: "FAM-004",
    family_name: "Wilson Family",
    email: "tom.wilson@email.com",
    phone: "+1 (555) 456-7890",
    children_count: 2,
    location: "Bronx, NY",
    status: "ACTIVE",
    created_at: "2024-02-01T16:20:00Z",
    caregiver_preference: "Evening",
    hourly_budget: 28,
    verified: true
  },
  {
    id: "FAM-005",
    family_name: "Garcia Family",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 567-8901",
    children_count: 1,
    location: "Staten Island, NY",
    status: "INACTIVE",
    created_at: "2024-02-05T11:10:00Z",
    caregiver_preference: "Full-time",
    hourly_budget: 24,
    verified: true
  },
  {
    id: "FAM-006",
    family_name: "Anderson Family",
    email: "john.anderson@email.com",
    phone: "+1 (555) 678-9012",
    children_count: 4,
    location: "Manhattan, NY",
    status: "ACTIVE",
    created_at: "2024-02-10T13:30:00Z",
    caregiver_preference: "Full-time",
    hourly_budget: 35,
    verified: true
  },
  {
    id: "FAM-007",
    family_name: "Martinez Family",
    email: "carlos.martinez@email.com",
    phone: "+1 (555) 789-0123",
    children_count: 2,
    location: "Brooklyn, NY",
    status: "PENDING",
    created_at: "2024-02-15T08:45:00Z",
    caregiver_preference: "Part-time",
    hourly_budget: 26,
    verified: false
  },
  {
    id: "FAM-008",
    family_name: "Taylor Family",
    email: "jennifer.taylor@email.com",
    phone: "+1 (555) 890-1234",
    children_count: 1,
    location: "Queens, NY",
    status: "ACTIVE",
    created_at: "2024-02-20T15:00:00Z",
    caregiver_preference: "Weekend",
    hourly_budget: 32,
    verified: true
  }
];

export default function FamiliesTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showRestrictDialog, setShowRestrictDialog] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [families, setFamilies] = useState<Family[]>(mockFamilies);
  const [loading, setLoading] = useState(false);

  const handleRestrictFamily = (family: Family) => {
    setSelectedFamily(family);
    setShowRestrictDialog(true);
  };

  const onConfirmRestrict = () => {
    if (!selectedFamily) return;

    const newStatus = selectedFamily.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    
    setFamilies(prev => 
      prev.map(family => 
        family.id === selectedFamily.id 
          ? { ...family, status: newStatus as "ACTIVE" | "INACTIVE" | "PENDING" }
          : family
      )
    );

    setShowRestrictDialog(false);
    setSelectedFamily(null);
  };

  const filteredFamilies = useMemo(() => {
    return families.filter(family => {
      const matchesSearch = 
        family.family_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        family.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        family.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        family.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || family.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, families]);

  const totalPages = Math.ceil(filteredFamilies.length / ITEMS_PER_PAGE);
  
  const paginatedFamilies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFamilies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredFamilies]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatFamilyId = (id: string) => {
    return id;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    
    const itemKey = `${label}-${text}`;
    setCopiedItems(prev => new Set(prev).add(itemKey));
    
    setTimeout(() => {
      setCopiedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border/40">
      <AlertDialog open={showRestrictDialog} onOpenChange={setShowRestrictDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedFamily?.status === "ACTIVE" ? "Deactivate Family" : "Activate Family"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedFamily?.status === "ACTIVE" 
                ? `Are you sure you want to deactivate ${selectedFamily?.family_name}? They will no longer be able to find caregivers.`
                : `Are you sure you want to activate ${selectedFamily?.family_name}? They will be able to find and book caregivers.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmRestrict}>
              {selectedFamily?.status === "ACTIVE" ? "Deactivate" : "Activate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Families ({filteredFamilies.length})</h2>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search families..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Family</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Children</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Preference</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFamilies.map((family) => (
                <TableRow key={family.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{family.family_name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <span>{formatFamilyId(family.id)}</span>
                          {family.verified && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{family.email}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(family.email, "email")}
                        >
                          {copiedItems.has(`email-${family.email}`) ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <div className="text-muted-foreground">{family.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-500" />
                      <span className="font-medium">{family.children_count}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{family.location}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {family.caregiver_preference}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${family.hourly_budget}/hr</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs", getStatusColor(family.status))}>
                      {family.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(family.created_at), "MMM d, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/dashboard/families/${family.id}`)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => copyToClipboard(family.id, "family-id")}
                        >
                          Copy Family ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleRestrictFamily(family)}
                          className={family.status === "ACTIVE" ? "text-destructive" : "text-green-600"}
                        >
                          {family.status === "ACTIVE" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredFamilies.length)} of {filteredFamilies.length} families
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}