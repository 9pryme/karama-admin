import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/services/user";

interface UserScheduleTabProps {
  user: User;
}

export function UserScheduleTab({ user }: UserScheduleTabProps) {
  const isFamily = user.role === "FAMILY";
  const isCaregiver = user.role === "CAREGIVER";

  const serviceDays = isFamily 
    ? user.family_profile?.caregiver_preference?.service_days 
    : user.caregiver_profile?.service_days;

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!serviceDays || serviceDays.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No schedule information available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {serviceDays.map((day) => (
            <div key={day.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{day.day}</span>
              <span className="text-muted-foreground">
                {formatTime(day.begin)} - {formatTime(day.end)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 