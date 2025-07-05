"use client";

import FeatureComingSoon from "@/components/ui/feature-coming-soon";

interface UserProfileContentProps {
  userId: string;
  userData?: any;
  walletData?: any;
  accountNumbers?: any;
  onRefresh?: () => void;
}

export default function UserProfileContent({ 
  userId, 
  userData,
  walletData,
  accountNumbers,
  onRefresh
}: UserProfileContentProps) {
  return (
    <FeatureComingSoon 
      title="User Profile Content"
      description="Detailed user profile information and management for childcare platform"
    />
  );
}