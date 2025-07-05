import FeatureComingSoon from "@/components/ui/feature-coming-soon";

interface UserActionsProps {
  userId: string;
  frozen?: boolean;
  onFrozenUpdate?: (frozen: boolean) => void;
  userName?: string;
}

export default function UserActions({ userId, frozen, onFrozenUpdate, userName }: UserActionsProps) {
  return (
    <FeatureComingSoon 
      title="User Actions"
      description="Manage user account actions and permissions"
    />
  );
}