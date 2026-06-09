import { StateCreator } from "zustand";

import { Certification, Insurance, Membership } from "@/features/experts/types";

export type CredentialsSlice = {
  certifications: Certification[];
  certificationImages: (File | null)[];
  //   certificationIPreview: string[];

  memberships: Membership[];
  insurances: Insurance[];

  addCertification: () => void;

  updateCertification: (
    i: number,
    key: keyof Certification,
    value: unknown,
  ) => void;
  removeCertification: (i: number) => void;

  updateCertificationImage: (i: number, file: File | null) => void;
  removeCertificationImage: (index: number) => void;

  addMembership: () => void;
  updateMembership: (i: number, key: keyof Membership, value: unknown) => void;
  removeMembership: (i: number) => void;

  addInsurance: () => void;
  updateInsurance: (i: number, key: keyof Insurance, value: unknown) => void;
  removeInsurance: (i: number) => void;
};

export const createCredentialsSlice: StateCreator<CredentialsSlice> = (
  set,
) => ({
  certifications: [],
  certificationImages: [],
  memberships: [],
  insurances: [],

  addCertification: () =>
    set((state) => ({
      certifications: [
        ...state.certifications,
        {
          issuingOrganisation: "",
          verificationNumber: "",
          issuingDate: "",
          expiringDate: "",
          isVerified: false,
        },
      ],
      certificationImages: [...state.certificationImages, null],
    })),

  updateCertification: (i, key, value) =>
    set((state) => {
      const arr = [...state.certifications];
      arr[i] = { ...arr[i], [key]: value };
      return { certifications: arr };
    }),

  removeCertification: (i) =>
    set((state) => ({
      certifications: state.certifications.filter((_, index) => index !== i),
      certificationImages: state.certificationImages.filter(
        (_, index) => index !== i,
      ),
    })),

  updateCertificationImage: (i, file) =>
    set((state) => {
      const imgs = [...state.certificationImages];
      imgs[i] = file;
      return { certificationImages: imgs };
    }),

  removeCertificationImage: (index) =>
    set((state) => ({
      certificationImages: state.certificationImages.filter(
        (_, i) => i !== index,
      ),
    })),

  addMembership: () =>
    set((state) => ({
      memberships: [
        ...state.memberships,
        { organisation: "", positionHeld: "", startDate: "", endDate: "" },
      ],
    })),

  updateMembership: (i, key, value) =>
    set((state) => {
      const arr = [...state.memberships];
      arr[i] = { ...arr[i], [key]: value };
      return { memberships: arr };
    }),

  removeMembership: (i) =>
    set((state) => ({
      memberships: state.memberships.filter((_, idx) => idx !== i),
    })),

  addInsurance: () =>
    set((state) => ({
      insurances: [
        ...state.insurances,
        { issuingOrganisation: "", coverage: "", description: "" },
      ],
    })),

  updateInsurance: (i, key, value) =>
    set((state) => {
      const arr = [...state.insurances];
      arr[i] = { ...arr[i], [key]: value };
      return { insurances: arr };
    }),

  removeInsurance: (i) =>
    set((state) => ({
      insurances: state.insurances.filter((_, idx) => idx !== i),
    })),
});
