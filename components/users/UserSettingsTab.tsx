import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { User } from "@/lib/services/user";

interface UserSettingsTabProps {
  user: User;
}

export function UserSettingsTab({ user }: UserSettingsTabProps) {
  // Handle case where settings might be null
  if (!user.settings) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-center py-4">
              No settings configured for this user
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subscribed to Promotions:</span>
              <Badge variant={user.subscribed_to_promotions ? "default" : "secondary"}>
                {user.subscribed_to_promotions ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Show Last Active Status:</span>
              <Badge variant={user.settings.show_last_activive_status ? "default" : "secondary"}>
                {user.settings.show_last_activive_status ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discoverability Paused:</span>
              <Badge variant={user.settings.pause_discoverability ? "destructive" : "default"}>
                {user.settings.pause_discoverability ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {user.settings.notification_settings && (
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">New Likes:</span>
                <Badge variant={user.settings.notification_settings.new_like ? "default" : "secondary"}>
                  {user.settings.notification_settings.new_like ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">New Matches:</span>
                <Badge variant={user.settings.notification_settings.new_match ? "default" : "secondary"}>
                  {user.settings.notification_settings.new_match ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">New Messages:</span>
                <Badge variant={user.settings.notification_settings.new_message ? "default" : "secondary"}>
                  {user.settings.notification_settings.new_message ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Offers & News:</span>
                <Badge variant={user.settings.notification_settings.offers_and_news ? "default" : "secondary"}>
                  {user.settings.notification_settings.offers_and_news ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">What's New:</span>
                <Badge variant={user.settings.notification_settings.whats_new ? "default" : "secondary"}>
                  {user.settings.notification_settings.whats_new ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 