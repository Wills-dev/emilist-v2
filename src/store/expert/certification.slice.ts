import { StateCreator } from "zustand";
import { CertificationSlice } from "../types/expert";

export const createCertificationSlice: StateCreator<CertificationSlice> = (
  set,
) => ({
  certifications: [],
  certificationImages: [],
  certificationPreview: [],
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
          doesntExpire: false,
        },
      ],
      certificationImages: [...state.certificationImages, null],
      certificationView: [...state.certificationView, true],
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
      certificationPreview: state.certificationPreview.filter(
        (_, index) => index !== i,
      ),
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
      const imgs = [...state.certificationImages];
      const previewImg = [...state.certificationPreview];
      imgs[i] = file;
      previewImg[i] = preview;
      return { certificationImages: imgs, certificationPreview: previewImg };
    }),

  removeCertificationImage: (index) =>
    set((state) => ({
      certificationImages: state.certificationImages.map((img, i) =>
        i === index ? null : img,
      ),
      certificationPreview: state.certificationPreview.map((img, i) =>
        i === index ? "" : img,
      ),
    })),
});
