export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: string;
  lastLoginAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark";
  emailNotifications: boolean;
  language: string;
}

export interface UserArticle {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: unknown; // Article type from your existing types
  isDraft: boolean;
}
