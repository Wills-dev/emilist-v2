import { StateCreator } from "zustand";
import { ProfileSlice } from "../types/expert";

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  profile: {
    firstName: "",
    lastName: "",
    countryCode: "+234",
    mobile: "",
    language: [],
    houseAddress: "",
    state: "",
    city: "",
    country: "",
    bio: "",
    image: null,
  },

  profilePreview: "",

  updateProfile: (key, value) =>
    set((state) => ({
      profile: { ...state.profile, [key]: value },
    })),

  setProfile: (userDetails) =>
    set({
      profile: userDetails,
    }),

  toggleLanguage: (language) =>
    set((state) => ({
      profile: {
        ...state.profile,
        language: state.profile.language.includes(language)
          ? state.profile.language.filter((x) => x !== language)
          : [...state.profile.language, language],
      },
    })),

  setProfileImage: (file, preview) =>
    set((state) => ({
      profile: { ...state.profile, image: file },
      profilePreview: preview,
    })),

  deleteImage: () =>
    set((state) => ({
      profile: { ...state.profile, image: null },
      profilePreview: "",
    })),

  resetProfileForm: () =>
    set({
      profile: {
        firstName: "",
        lastName: "",
        countryCode: "+234",
        mobile: "",
        language: [],
        houseAddress: "",
        state: "",
        city: "",
        country: "",
        bio: "",
        image: null,
      },

      profilePreview: "",
    }),
});
