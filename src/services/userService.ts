import { auth } from "../config/firebase";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import type { UserProfile, UserPreferences } from "../types/user";

const db = getFirestore();

export const userService = {
  async createProfile(uid: string): Promise<UserProfile> {
    const userRef = doc(db, "users", uid);
    const defaultProfile: UserProfile = {
      uid,
      displayName: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      photoURL: auth.currentUser?.photoURL,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      preferences: {
        theme: "dark",
        emailNotifications: true,
        language: "ja",
      },
    };

    await setDoc(userRef, defaultProfile);
    return defaultProfile;
  },

  async getProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data() as UserProfile;
  },

  async updateProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...data,
      lastLoginAt: new Date().toISOString(),
    });
  },

  async updatePreferences(
    uid: string,
    preferences: Partial<UserPreferences>
  ): Promise<void> {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      preferences: preferences,
    });
  },
};
