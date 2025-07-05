import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone, Mail, Calendar, Clock } from "lucide-react";
import { User } from "@/lib/services/user";

interface UserPersonalInfoProps {
  user: User;
  profilePicture?: string;
}

export function UserPersonalInfo({ user, profilePicture }: UserPersonalInfoProps) {
  const profile = user.family_profile || user.caregiver_profile;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar and Basic Info */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profilePicture} alt={user.name || user.phone_number || undefined} />
            <AvatarFallback className="text-2xl">
              {user.name ? user.name.split(' ').map((n: string) => n[0]).join('') : user.phone_number.slice(-2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.name || user.phone_number}</h2>
            <p className="text-muted-foreground">{user.role === "FAMILY" ? "Family" : user.role === "CAREGIVER" ? "Caregiver" : "New User"}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{user.phone_number}</span>
          </div>
          {user.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>
          )}
          {profile?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profile.location}</span>
            </div>
          )}
        </div>

        {/* Account Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Joined {formatDate(user.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Last active {formatDate(user.last_login)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{user.plan} Plan</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 