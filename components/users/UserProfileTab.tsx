import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign } from "lucide-react";
import { User } from "@/lib/services/user";

interface UserProfileTabProps {
  user: User;
}

export function UserProfileTab({ user }: UserProfileTabProps) {
  const isFamily = user.role === "FAMILY";
  const isCaregiver = user.role === "CAREGIVER";

  return (
    <div className="space-y-6">
      {isFamily && user.family_profile && (
        <>
          {/* Family Description */}
          {user.family_profile.description && (
            <Card>
              <CardHeader>
                <CardTitle>About Our Family</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Description:</p>
                <p>{user.family_profile.description.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Children */}
          {user.family_profile.children && user.family_profile.children.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Children
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {user.family_profile.children.map((child) => (
                    <div key={child.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{child.age_group}</span>
                      <Badge variant="outline">{child.count} child{child.count > 1 ? 'ren' : ''}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Allergies */}
          {user.family_profile.allergies && (
            <Card>
              <CardHeader>
                <CardTitle>Allergies & Special Needs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.family_profile.allergies.food_allergies && user.family_profile.allergies.food_allergies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Food Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.family_profile.allergies.food_allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline">{allergy}</Badge>
                      ))}
                    </div>
                    {user.family_profile.allergies.other_food_allergies && (
                      <p className="text-sm text-muted-foreground mt-2">Other: {user.family_profile.allergies.other_food_allergies}</p>
                    )}
                  </div>
                )}
                
                {user.family_profile.allergies.environmental_allergies && user.family_profile.allergies.environmental_allergies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Environmental Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.family_profile.allergies.environmental_allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline">{allergy}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {user.family_profile.allergies.other_allergies && user.family_profile.allergies.other_allergies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Other Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.family_profile.allergies.other_allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline">{allergy}</Badge>
                      ))}
                    </div>
                    {user.family_profile.allergies.other_other_allergies && (
                      <p className="text-sm text-muted-foreground mt-2">Other: {user.family_profile.allergies.other_other_allergies}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Household Information */}
          {user.family_profile.household_info && (
            <Card>
              <CardHeader>
                <CardTitle>Household Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.family_profile.household_info.diets && user.family_profile.household_info.diets.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Diet Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.family_profile.household_info.diets.map((diet, index) => (
                        <Badge key={index} variant="outline">{diet}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {user.family_profile.household_info.rules && user.family_profile.household_info.rules.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Household Rules</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.family_profile.household_info.rules.map((rule, index) => (
                        <Badge key={index} variant="outline">{rule}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {user.family_profile.household_info.religion && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Religion</h4>
                    <Badge variant="outline">{user.family_profile.household_info.religion}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {user.family_profile.extra_info?.payment_info && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{user.family_profile.extra_info.payment_info.type}</span>
                  </div>
                  {user.family_profile.extra_info.payment_info.hourly_min && user.family_profile.extra_info.payment_info.hourly_max && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hourly Rate:</span>
                      <span>${user.family_profile.extra_info.payment_info.hourly_min} - ${user.family_profile.extra_info.payment_info.hourly_max}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method:</span>
                    <span>{user.family_profile.extra_info.payment_info.method}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {isCaregiver && user.caregiver_profile && (
        <>
          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Caregiver Type</h4>
                  <Badge variant="outline">{user.caregiver_profile.caregiver_type}</Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Experience</h4>
                  <Badge variant="outline">{user.caregiver_profile.years_of_experience}</Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Education Level</h4>
                  <Badge variant="outline">{user.caregiver_profile.education_level}</Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Children Capacity</h4>
                  <Badge variant="outline">{user.caregiver_profile.children_capacity} children</Badge>
                </div>
              </div>
              
              {user.caregiver_profile.ages_best_with && user.caregiver_profile.ages_best_with.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Best With Age Groups</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.caregiver_profile.ages_best_with.map((age, index) => (
                      <Badge key={index} variant="outline">{age}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Abilities & Certifications */}
          {user.caregiver_profile.abilities_and_certifications && (
            <Card>
              <CardHeader>
                <CardTitle>Abilities & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.caregiver_profile.abilities_and_certifications.abilities && user.caregiver_profile.abilities_and_certifications.abilities.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Abilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.caregiver_profile.abilities_and_certifications.abilities.map((ability, index) => (
                        <Badge key={index} variant="outline">{ability}</Badge>
                      ))}
                    </div>
                    {user.caregiver_profile.abilities_and_certifications.other_ability && (
                      <p className="text-sm text-muted-foreground mt-2">Other: {user.caregiver_profile.abilities_and_certifications.other_ability}</p>
                    )}
                  </div>
                )}
                
                {user.caregiver_profile.abilities_and_certifications.certifications && user.caregiver_profile.abilities_and_certifications.certifications.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.caregiver_profile.abilities_and_certifications.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline">{cert}</Badge>
                      ))}
                    </div>
                    {user.caregiver_profile.abilities_and_certifications.other_certification && (
                      <p className="text-sm text-muted-foreground mt-2">Other: {user.caregiver_profile.abilities_and_certifications.other_certification}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {user.caregiver_profile.payment_info && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{user.caregiver_profile.payment_info.type}</span>
                  </div>
                  {user.caregiver_profile.payment_info.hourly_min && user.caregiver_profile.payment_info.hourly_max && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hourly Rate:</span>
                      <span>${user.caregiver_profile.payment_info.hourly_min} - ${user.caregiver_profile.payment_info.hourly_max}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method:</span>
                    <span>{user.caregiver_profile.payment_info.method}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
} 