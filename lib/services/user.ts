import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

// Type assertion to ensure TypeScript knows API_URL is defined
const VERIFIED_API_URL: string = API_URL;

// Complete interface structures matching the API response
export interface ProfilePicture {
  created_at: string;
  updated_at: string;
  _v: number;
  id: string;
  path: string;
  key: string;
  blur_hash: string;
  type: 'PROFILE_PICTURE' | 'OTHER';
}

export interface Child {
  id: string;
  age_group: string;
  count: number;
}

export interface Allergies {
  id: string;
  food_allergies: string[];
  other_food_allergies?: string | null;
  environmental_allergies: string[];
  other_environtal_allergies?: string | null;
  other_allergies: string[];
  other_other_allergies?: string | null;
}

export interface ChildrenInterests {
  id: string;
  creative_interests: string[];
  other_creative_interest?: string | null;
  instrument_interests: string[];
  other_instrument_interest?: string | null;
  sport_interests: string[];
  other_sport_interest?: string | null;
  stem_interests: string[];
  other_stem_interest?: string | null;
}

export interface HouseholdInfo {
  id: string;
  diets: string[];
  other_diets?: string | null;
  show_diet_on_profile: boolean;
  rules: string[];
  other_rules?: string | null;
  show_rules_on_profile: boolean;
  religion: string;
  other_religion?: string | null;
  show_religion_on_profile: boolean;
}

export interface Philosophies {
  id: string;
  philosophies: string[];
  other?: string | null;
  show_on_profile: boolean;
}

export interface PaymentInfo {
  id: string;
  type: string;
  hourly_min?: number;
  hourly_max?: number;
  salary?: number | null;
  method: string;
  show_method_on_profile: boolean;
}

export interface Benefits {
  id: string;
  benefits: string[];
  other?: string | null;
  show_on_profile: boolean;
}

export interface Prompt {
  id: string;
  category: string;
  title: string;
  answer: string;
}

export interface ExtraInfo {
  id: string;
  more_information: string;
  payment_info: PaymentInfo;
  benefits: Benefits;
  prompts: Prompt[];
}

export interface ServiceDay {
  id: string;
  day: string;
  begin: string;
  end: string;
}

export interface GenderPreference {
  id: string;
  genders: string[];
  other?: string | null;
  dealbreaker: boolean;
}

export interface AgePreference {
  id: string;
  age_group: string;
  is_dealbeaker: boolean;
}

export interface Requirements {
  id: string;
  requirements: string[];
  other_requirement?: string | null;
  requirements_are_dealbreaker: boolean;
  certifications: string[];
  other_certification?: string | null;
  certificates_are_dealbreaker: boolean;
}

export interface JobCommitment {
  id: string;
  commitment: string;
  start_date: string;
  end_date?: string | null;
  is_dealbreaker: boolean;
}

export interface Responsibilities {
  id: string;
  childcare_responsibilities: string[];
  other_childcare_responsibilities?: string | null;
  household_responsibilities: string[];
  other_household_responsibilities?: string | null;
}

export interface CaregiverPreference {
  id: string;
  caregiver_types: string[];
  caregiver_type_is_dealbreaker: boolean;
  personalities: string[];
  personality_is_dealbreaker: boolean;
  experience: string;
  experience_is_dealbreaker: boolean;
  must_speak_same_language: boolean;
  education_level: string;
  show_education_level_on_profile: boolean;
  availability: string;
  availability_is_dealbreaker: boolean;
  arrangement_type: string;
  arrangement_type_is_dealbreaker: boolean;
  rejected_caregivers: string[];
  liked_caregivers: string[];
  blocked_caregivers: string[];
  gender_preference: GenderPreference;
  age_preference: AgePreference;
  requirements: Requirements;
  job_commitment: JobCommitment;
  service_days: ServiceDay[];
  responsibilities: Responsibilities;
}

export interface FamilyDescription {
  id: string;
  description: string;
  other?: string | null;
  show_on_profile: boolean;
}

export interface FamilyProfile {
  created_at: string;
  updated_at: string;
  _v: number;
  id: string;
  name: string;
  behavioural_differences: string[];
  other_behavioural_differences?: string | null;
  zipcode: string;
  latitude: number;
  longitude: number;
  location: string;
  discovery_radius: number;
  geo_coordinates: {
    type: string;
    coordinates: [number, number];
  };
  aquisition_source: string;
  languages: string[];
  other_languages?: string | null;
  pets: string[];
  other_pets?: string | null;
  average_rating?: number | null;
  rating_count: number;
  random_order: number;
  description: FamilyDescription;
  children: Child[];
  allergies: Allergies;
  children_interests: ChildrenInterests;
  household_info: HouseholdInfo;
  philosophies: Philosophies;
  extra_info: ExtraInfo;
  pictures: ProfilePicture[];
  caregiver_preference: CaregiverPreference;
}

// Caregiver-specific interfaces
export interface AbilitiesAndCertifications {
  id: string;
  abilities: string[];
  other_ability?: string | null;
  certifications: string[];
  other_certification?: string | null;
}

export interface Language {
  id: string;
  languages: string[];
  other?: string | null;
  requires_same_language_family: boolean;
}

export interface ExperienceWithDisabilities {
  id: string;
  disabilities: string[];
  other?: string | null;
}

export interface ExperienceWithPets {
  id: string;
  pets: string[];
  other?: string | null;
}

export interface Hobbies {
  id: string;
  creative_interests: string[];
  other_creative_interest?: string | null;
  instrument_interests: string[];
  other_instrument_interest?: string | null;
  sport_interests: string[];
  other_sport_interest?: string | null;
  stem_interests: string[];
  other_stem_interest?: string | null;
}

export interface Characteristics {
  id: string;
  diets: string[];
  other_diets?: string | null;
  show_diet_on_profile: boolean;
  rules: string[];
  other_rules?: string | null;
  show_rules_on_profile: boolean;
  religion: string;
  other_religion?: string | null;
  show_religion_on_profile: boolean;
  personalities: string[];
  religion_is_dealbreaker: boolean;
}

export interface CaregiverJobCommitment {
  id: string;
  commitment: string;
  start_date: string;
  end_date?: string | null;
}

export interface CaregiverServiceDay {
  id: string;
  day: string;
  begin: string;
  end: string;
}

export interface CaregiverResponsibilities {
  id: string;
  childcare_responsibilities: string[];
  other_childcare_responsibilities?: string | null;
  household_responsibilities: string[];
  other_household_responsibilities?: string | null;
}

export interface CaregiverPaymentInfo {
  id: string;
  type: string;
  hourly_min?: number;
  hourly_max?: number;
  salary?: number | null;
  method: string;
  show_method_on_profile: boolean;
}

export interface PastPosition {
  id: string;
  family_or_business_name: string;
  start_date: string;
  end_date: string;
  position_type: string;
  children_age_group: string[];
  availability: string;
  childcare_responsibilities: string[];
  household_responsibilities: string[];
}

export interface CaregiverPrompt {
  id: string;
  category: string;
  title: string;
  answer: string;
}

export interface CaregiverProfile {
  created_at: string;
  updated_at: string;
  _v: number;
  id: string;
  name: string;
  date_of_birth: string;
  gender: string;
  pronouns: string;
  aquisition_source: string;
  zipcode: string;
  latitude: number;
  longitude: number;
  discovery_radius: number;
  geo_coordinates: {
    type: string;
    coordinates: [number, number];
  };
  location: string;
  caregiver_type: string;
  years_of_experience: string;
  education_level: string;
  show_edu_level_on_profile: boolean;
  ages_best_with: string[];
  children_capacity: number;
  childcare_philosophies: string[];
  other_philosohies?: string | null;
  availability: string[];
  arrangement_type: string;
  required_benfits: string[];
  other_required_benefits?: string | null;
  rejected_families: string[];
  liked_families: string[];
  blocked_families: string[];
  average_rating?: number | null;
  rating_count: number;
  random_order: number;
  abilities_and_certifications: AbilitiesAndCertifications;
  language: Language;
  experience_with_disabilities: ExperienceWithDisabilities;
  experience_with_pets: ExperienceWithPets;
  hobbies: Hobbies;
  characteristics: Characteristics;
  job_commitment: CaregiverJobCommitment;
  service_days: CaregiverServiceDay[];
  responsibilities: CaregiverResponsibilities;
  payment_info: CaregiverPaymentInfo;
  past_positions: PastPosition[];
  prompts: CaregiverPrompt[];
  pictures: ProfilePicture[];
}

export interface NotificationSettings {
  new_like: boolean;
  new_match: boolean;
  whats_new: boolean;
  new_message: boolean;
  offers_and_news: boolean;
}

export interface UserSettings {
  notification_settings: NotificationSettings;
  pause_discoverability: boolean;
  show_last_activive_status: boolean;
  show_age?: boolean;
}

export interface User {
  created_at: string;
  updated_at: string;
  _v: number;
  user_id: string;
  phone_number: string;
  email: string | null;
  role: 'FAMILY' | 'CAREGIVER' | 'NEW_USER';
  access_level: string;
  name: string | null;
  plan: string;
  subscribed_to_promotions: boolean;
  activity_status: string;
  last_login: string;
  settings: UserSettings | null;
  family_profile: FamilyProfile | null;
  caregiver_profile: CaregiverProfile | null;
  profile_picture: ProfilePicture | null;
}

export interface UserListResponse {
  statusCode: number;
  status: string;
  success: boolean;
  error: string;
  message: string;
  data: {
    users: User[];
    next_cursor?: string;
  };
}

// Legacy interface for backward compatibility
export interface UserBalance {
  balance: number;
  currency: string;
}

class UserService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL!;
  }

  private getAuthToken(): string {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return token;
  }

  private getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'Content-Type': 'application/json',
    };
  }

  async getAllUsers(): Promise<{ families: User[]; caregivers: User[]; newUsers: User[] }> {
    try {
      let allUsers: User[] = [];
      let cursor: string | null = null;
      
      // Fetch all pages using pagination
      while (true) {
        const requestUrl: string = cursor 
          ? `${this.baseUrl}/admin/users/list?cursor=${cursor}`
          : `${this.baseUrl}/admin/users/list`;
        
        const response = await axios.get<UserListResponse>(requestUrl, {
          headers: this.getAuthHeaders(),
        });
        
        if (!response.data.success) {
          throw new Error(response.data.error || 'Failed to fetch users');
        }
        
        const users = Array.isArray(response.data.data.users) ? response.data.data.users : [];
        allUsers = allUsers.concat(users);
        
        // Check if there's a next page
        cursor = response.data.data.next_cursor || null;
        
        // If no more pages or no users returned, break
        if (!cursor || users.length === 0) {
          break;
        }
      }
      
      // Separate users by role
      const families = allUsers.filter(user => user.role === 'FAMILY');
      const caregivers = allUsers.filter(user => user.role === 'CAREGIVER');
      const newUsers = allUsers.filter(user => user.role === 'NEW_USER');
      
      return {
        families,
        caregivers,
        newUsers
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string; error: string }>;
        throw new Error(axiosError.response?.data?.message || axiosError.response?.data?.error || 'Failed to fetch users');
      }
      throw new Error('An unexpected error occurred while fetching users');
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      // For individual user, we'll fetch all users and find the specific one
      // In the future, you might want to implement a specific endpoint for this
      const allUsers = await this.getAllUsers();
      const allUsersList = [...allUsers.families, ...allUsers.caregivers, ...allUsers.newUsers];
      const user = allUsersList.find(u => u.user_id === userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async searchUsers(query: string): Promise<{ families: User[]; caregivers: User[]; newUsers: User[] }> {
    try {
      const allUsers = await this.getAllUsers();
      
      const searchTerm = query.toLowerCase();
      
      const filteredFamilies = allUsers.families.filter(user => 
        user.name?.toLowerCase().includes(searchTerm) ||
        user.phone_number.includes(searchTerm) ||
        (user.email && user.email.toLowerCase().includes(searchTerm)) ||
        (user.family_profile?.location && user.family_profile.location.toLowerCase().includes(searchTerm))
      );
      
      const filteredCaregivers = allUsers.caregivers.filter(user => 
        user.name?.toLowerCase().includes(searchTerm) ||
        user.phone_number.includes(searchTerm) ||
        (user.email && user.email.toLowerCase().includes(searchTerm)) ||
        (user.caregiver_profile?.location && user.caregiver_profile.location.toLowerCase().includes(searchTerm))
      );
      
      const filteredNewUsers = allUsers.newUsers.filter(user => 
        user.name?.toLowerCase().includes(searchTerm) ||
        user.phone_number.includes(searchTerm) ||
        (user.email && user.email.toLowerCase().includes(searchTerm))
      );
      
      return {
        families: filteredFamilies,
        caregivers: filteredCaregivers,
        newUsers: filteredNewUsers
      };
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  // Legacy methods for backward compatibility
  async getUserBalance(userId: string): Promise<UserBalance> {
    // Placeholder - implement based on your actual API
    return { balance: 0, currency: 'USD' };
  }

  async fundUserWallet(userId: string, amount: number, description?: string): Promise<any> {
    // Placeholder - implement based on your actual API
    throw new Error('Not implemented yet');
  }

  async debitUserWallet(userId: string, amount: number, description?: string): Promise<any> {
    // Placeholder - implement based on your actual API
    throw new Error('Not implemented yet');
  }

  async deleteUser(phoneNumber: string): Promise<void> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/admin/users/delete`,
        {
          headers: this.getAuthHeaders(),
          data: {
            phone_number: phoneNumber
          }
        }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string; error: string }>;
        throw new Error(axiosError.response?.data?.message || axiosError.response?.data?.error || 'Failed to delete user');
      }
      throw new Error('An unexpected error occurred while deleting user');
    }
  }

  getUserDisplayName(user: User): string {
    return user.name || user.phone_number || 'Unknown User';
  }

  formatUserForDisplay(user: User) {
    const profile = user.family_profile || user.caregiver_profile;
    return {
      id: user.user_id,
      name: this.getUserDisplayName(user),
      role: user.role,
      location: profile?.location || 'Unknown',
      status: user.activity_status,
      plan: user.plan,
      lastLogin: user.last_login,
      profilePicture: user.profile_picture?.path || null,
      phone: user.phone_number,
      email: user.email,
      children: user.family_profile?.children || [],
      caregiverType: user.caregiver_profile?.caregiver_type || null,
      experience: user.caregiver_profile?.years_of_experience || null,
      paymentInfo: user.family_profile?.extra_info?.payment_info || user.caregiver_profile?.payment_info || null
    };
  }

  getProfileImageUrl(user: User): string {
    return user.profile_picture?.path || '/placeholder-avatar.jpg';
  }

  clearUserCaches(): void {
    // Clear any caches if needed
  }
}

export const userService = new UserService(); 