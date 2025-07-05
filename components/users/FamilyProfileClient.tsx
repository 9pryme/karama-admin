"use client";

import FeatureComingSoon from "@/components/ui/feature-coming-soon";

interface UserProfileClientProps {
  userId: string;
}

export default function UserProfileClient({ userId }: UserProfileClientProps) {
  return (
    <FeatureComingSoon 
      title="User Profile"
      description="Detailed user profile information and management"
    />
  );
} 