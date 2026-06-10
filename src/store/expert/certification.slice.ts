import { StateCreator } from "zustand";
import { CertificationSlice } from "../types/expert";

export const createCertificationSlice: StateCreator<CertificationSlice> = (
  set,
) => ({
  certifications: [],
  certificationView: [],

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
          isCertificateExpire: false,

          image: null,
          preview: "",
        },
      ],

      certificationView: [...state.certificationView, true],
    })),

  updateCertification: (i, key, value) =>
    set((state) => {
      const certifications = [...state.certifications];

      const updated = {
        ...certifications[i],
        [key]: value,
      };

      if (key === "expiringDate" && value) {
        updated.isCertificateExpire = false;
      }

      if (key === "isCertificateExpire" && value === true) {
        updated.expiringDate = "";
      }

      certifications[i] = updated;

      return { certifications };
    }),

  removeCertification: (i) =>
    set((state) => ({
      certifications: state.certifications.filter((_, index) => index !== i),
      certificationView: state.certificationView.filter(
        (_, index) => index !== i,
      ),
    })),

  toggleCertificationView: (i) =>
    set((state) => {
      const view = [...state.certificationView];
      view[i] = !view[i];
      return { certificationView: view };
    }),

  updateCertificationImage: (i, file, preview) =>
    set((state) => {
      const certifications = [...state.certifications];

      certifications[i] = {
        ...certifications[i],
        image: file,
        preview,
      };

      return { certifications };
    }),

  removeCertificationImage: (i) =>
    set((state) => {
      const certifications = [...state.certifications];

      certifications[i] = {
        ...certifications[i],
        image: null,
        preview: "",
      };

      return { certifications };
    }),
  resetCertification: () =>
    set({
      certifications: [],
      certificationView: [],
    }),
});
