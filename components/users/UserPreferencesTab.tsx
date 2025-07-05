import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/services/user";

interface UserPreferencesTabProps {
  user: User;
}

export function UserPreferencesTab({ user }: UserPreferencesTabProps) {
  const isFamily = user.role === "FAMILY";
  const isCaregiver = user.role === "CAREGIVER";

  if (isFamily && !user.family_profile?.caregiver_preference) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No preference information available</p>
        </CardContent>
      </Card>
    );
  }

  if (isCaregiver && !user.caregiver_profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No preference information available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {isFamily && user.family_profile?.caregiver_preference && (
        <Card>
          <CardHeader>
            <CardTitle>Caregiver Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.family_profile.caregiver_preference.caregiver_types && user.family_profile.caregiver_preference.caregiver_types.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Preferred Caregiver Types</h4>
                <div className="flex flex-wrap gap-2">
                  {user.family_profile.caregiver_preference.caregiver_types.map((type, index) => (
                    <Badge key={index} variant="outline">{type}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {user.family_profile.caregiver_preference.personalities && user.family_profile.caregiver_preference.personalities.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Preferred Personalities</h4>
                <div className="flex flex-wrap gap-2">
                  {user.family_profile.caregiver_preference.personalities.map((personality, index) => (
                    <Badge key={index} variant="outline">{personality}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Experience Requirement</h4>
                <Badge variant="outline">{user.family_profile.caregiver_preference.experience}</Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Availability</h4>
                <Badge variant="outline">{user.family_profile.caregiver_preference.availability}</Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Arrangement Type</h4>
                <Badge variant="outline">{user.family_profile.caregiver_preference.arrangement_type}</Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Education Level</h4>
                <Badge variant="outline">{user.family_profile.caregiver_preference.education_level}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isCaregiver && user.caregiver_profile && (
        <Card>
          <CardHeader>
            <CardTitle>Working Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.caregiver_profile.availability && user.caregiver_profile.availability.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Availability</h4>
                <div className="flex flex-wrap gap-2">
                  {user.caregiver_profile.availability.map((avail, index) => (
                    <Badge key={index} variant="outline">{avail}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Arrangement Type</h4>
                <Badge variant="outline">{user.caregiver_profile.arrangement_type}</Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Job Commitment</h4>
                <Badge variant="outline">{user.caregiver_profile.job_commitment.commitment}</Badge>
              </div>
            </div>

            {user.caregiver_profile.required_benfits && user.caregiver_profile.required_benfits.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Required Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {user.caregiver_profile.required_benfits.map((benefit, index) => (
                    <Badge key={index} variant="outline">{benefit}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 