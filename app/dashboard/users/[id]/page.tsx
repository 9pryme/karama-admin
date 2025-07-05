"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { ArrowLeft, Loader2, AlertCircle, Edit, Trash2 } from "lucide-react";
import { useUserById, useDeleteUser } from "@/hooks/use-users";
import { User } from "@/lib/services/user";
import { UserPersonalInfo } from "@/components/users/UserPersonalInfo";
import { UserPhotos } from "@/components/users/UserPhotos";
import { UserProfileTab } from "@/components/users/UserProfileTab";
import { UserPreferencesTab } from "@/components/users/UserPreferencesTab";
import { UserScheduleTab } from "@/components/users/UserScheduleTab";
import { UserSettingsTab } from "@/components/users/UserSettingsTab";
import { PhotoLightbox } from "@/components/users/PhotoLightbox";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  
  // Photo lightbox state
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Use React Query to fetch user by ID
  const { data: user, isLoading, error, isError } = useUserById(userId);

  // Delete user mutation
  const deleteUserMutation = useDeleteUser();

  // Helper function to get profile picture (first image or fallback)
  const getProfilePicture = (user: User) => {
    const profile = user.family_profile || user.caregiver_profile;
    const photos = profile?.pictures || [];
    
    // Find profile picture first, otherwise use first image
    const profilePic = photos.find(p => p.type === "PROFILE_PICTURE");
    const firstImage = photos[0];
    
    return profilePic?.path || firstImage?.path || undefined;
  };

  const openPhotoLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsLightboxOpen(true);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!user) return;
    const profile = user.family_profile || user.caregiver_profile;
    const photos = profile?.pictures || [];
    
    if (direction === 'prev') {
      setSelectedPhotoIndex(prev => 
        prev === null ? 0 : prev > 0 ? prev - 1 : photos.length - 1
      );
    } else {
      setSelectedPhotoIndex(prev => 
        prev === null ? 0 : prev < photos.length - 1 ? prev + 1 : 0
      );
    }
  };

  const handleEditUser = () => {
    // TODO: Implement edit functionality when endpoint is available
    console.log('Edit user:', user?.phone_number);
  };

  const handleDeleteUser = async () => {
    if (!user) return;
    
    try {
      await deleteUserMutation.mutateAsync(user.phone_number);
      // Navigate back to users list after successful deletion
      router.push('/dashboard/users');
      // Close dialog
      setIsDeleteDialogOpen(false);
    } catch (error) {
      // Error is handled by the mutation's onError callback
      console.error('Delete failed:', error);
      // Keep dialog open on error so user can try again
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">Loading user details...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div>
              <p className="text-lg font-semibold">Failed to load user</p>
              <p className="text-muted-foreground">
                {error?.message || "User not found"}
              </p>
            </div>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  const profile = user.family_profile || user.caregiver_profile;
  const photos = profile?.pictures || [];
  const profilePicture = getProfilePicture(user);

  return (
    <div className="space-y-6">
      {/* Back Button - Top Position */}
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Page Title with Badge and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{user.name || user.phone_number}</h1>
          <Badge variant={user.activity_status === "ACTIVE" ? "default" : "secondary"}>
            {user.activity_status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleEditUser}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content - Flex Layout */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left Column - Personal Info & Photos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Card */}
          <UserPersonalInfo user={user} profilePicture={profilePicture} />

          {/* Profile Photos */}
          <UserPhotos 
            user={user}
            photos={photos}
            onPhotoClick={openPhotoLightbox}
          />
        </div>

        {/* Right Column - Detailed Information Tabs */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <UserProfileTab user={user} />
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <UserPreferencesTab user={user} />
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <UserScheduleTab user={user} />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <UserSettingsTab user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Photo Lightbox */}
      <PhotoLightbox
        photos={photos}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        selectedIndex={selectedPhotoIndex}
        onNavigate={navigatePhoto}
        userName={user.name || user.phone_number}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        isLoading={deleteUserMutation.isPending}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        itemDetails={[
          { label: "Name", value: user.name || user.phone_number },
          { label: "Phone", value: user.phone_number },
          { label: "Role", value: user.role === "FAMILY" ? "Family" : user.role === "CAREGIVER" ? "Caregiver" : "New User" }
        ]}
      />
    </div>
  );
} 