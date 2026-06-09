export const expertTabs: {
  id: "business-profile" | "profile" | "experiences";
  title: string;
  desc: string;
  iconUrl: string;
}[] = [
  {
    id: "profile",
    title: "Join as an expert",
    desc: "Setup your profile on Emilist",
    iconUrl: "/assets/icons/user-star.svg",
  },
  {
    id: "business-profile",
    title: "Setup your service",
    desc: "Setup the services you’ll be providing on Emilist",
    iconUrl: "/assets/icons/file-cog.svg",
  },
  {
    id: "experiences",
    title: "Verify your expertise",
    desc: "Tell us about your experience with documented proof",
    iconUrl: "/assets/icons/file-cog.svg",
  },
];
