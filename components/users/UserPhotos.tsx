import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";
import { User, ProfilePicture } from "@/lib/services/user";

interface UserPhotosProps {
  user: User;
  photos: ProfilePicture[];
  onPhotoClick: (index: number) => void;
}

export function UserPhotos({ user, photos, onPhotoClick }: UserPhotosProps) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Profile Photos ({photos.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group hover:opacity-80 transition-opacity"
              onClick={() => onPhotoClick(index)}
            >
              <Image
                src={photo.path}
                alt={`${user.name} photo ${index + 1}`}
                fill
                className="object-cover"
              />
              {photo.type === "PROFILE_PICTURE" && (
                <Badge className="absolute top-2 left-2 text-xs">Profile</Badge>
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 