import ExpertIcon from "@/components/atoms/icons/ExpertIcon";
import PostJobIcon from "@/components/atoms/icons/PostJobIcon";
import EnterpriseIcon from "@/components/atoms/icons/EnterpriseIcon";
import BriefcaseIcon from "@/components/atoms/icons/BriefcaseIcon";
import BonicularIcon from "@/components/atoms/icons/BonicularIcon";
import GiverIcon from "@/components/atoms/icons/GiverIcon";

import Twitter from "@/components/atoms/icons/Twitter";
import LinkedIn from "@/components/atoms/icons/LinkedIn";
import Instagram from "@/components/atoms/icons/Instagram";

import { routes } from "../helpers/routes";
import FacebookIcon from "@/components/atoms/icons/FacebookIcon";

export const navbarLinks = [
  {
    title: "Join as Expert",
    href: routes?.joinExpert,
    icon: <ExpertIcon />,
  },
  {
    title: "Post a New Job",
    href: routes?.postJob,
    icon: <PostJobIcon />,
  },
  {
    title: "For Enterprise",
    href: routes?.marketplace?.jobs,
    icon: <EnterpriseIcon />,
  },
];

export const heroSeviceContent = [
  {
    icon: <BriefcaseIcon />,
    imgUrl: "/assets/images/post-job.svg",
    desc: "Post your job and get matched with verified experts ",
    title: "Post a Job",
    href: routes?.postJob,
  },
  {
    icon: <BonicularIcon />,
    imgUrl: "/assets/images/find-job.svg",
    desc: "Find job offers  with guaranteed payments near you",
    title: "Find a Job",
    href: routes?.marketplace?.jobs,
  },
  {
    icon: <GiverIcon />,
    imgUrl: "/assets/images/material.svg",
    desc: "Buy your materials from verified suppliers today",
    title: "Buy Materials",
    href: routes?.marketplace?.materials,
  },
];

export const sectionServiceActions = {
  experts: {
    title: "Hire Experts",
    href: routes?.marketplace?.experts,
  },
  jobs: {
    title: "Find Jobs",
    href: routes?.marketplace?.jobs,
  },
  materials: {
    title: "Buy Materials",
    href: routes?.marketplace?.materials,
  },
};

export const trustList = [
  {
    id: "1",
    title: "Verified Experts Only",
    desc: "We confirm CAC registration and valid ID before any expert is approved on the platform",
    imgUrl: "/assets/images/verified.svg",
    imgStyle: "sm:max-w-[69.29px] max-w-[40px] w-full",
  },
  {
    id: "2",
    title: "Your Payment Is Protected",
    desc: "Your money is held securely and released only after you confirm the job is done",
    imgUrl: "/assets/images/protected.svg",
    imgStyle: "sm:max-w-[77.25px]  max-w-[40px] w-full",
  },
  {
    id: "3",
    title: "Clear Timelines ",
    desc: "You agree on price, timeline and deliverables before the project begins",
    imgUrl: "/assets/images/timeless.svg",
    imgStyle: "sm:max-w-[95.16px]  max-w-[40px] w-full",
  },
  {
    id: "4",
    title: "Reliable 24/7 Support",
    desc: "Our team steps in to resolve issues quickly and fairly whenever you need us",
    imgUrl: "/assets/images/support.svg",
    imgStyle: "sm:max-w-[94.31px]  max-w-[40px] w-full",
  },
];

export const footerLinks = [
  {
    caption: "Company",
    links: [
      {
        title: "About Us",
        url: routes.aboutUs,
      },
      {
        title: "Privacy Policy",
        url: routes.policy,
      },
      {
        title: "Terms of Use",
        url: routes.terms,
      },
      {
        title: "Cookie Policy",
        url: routes.cookiePolicy,
      },
    ],
  },
  {
    caption: "Support",
    links: [
      {
        title: "How it works",
        url: routes.how,
      },
      {
        title: "FAQ",
        url: routes.faq,
      },
      {
        title: "Guides",
        url: routes.guides,
      },
      {
        title: "Help Center",
        url: routes.helpCenter,
      },
    ],
  },
  {
    caption: "Community",
    links: [
      {
        title: "Blogs",
        url: routes.blog,
      },
      {
        title: "Press & News",
        url: routes.news,
      },
      {
        title: "Helpful Tips",
        url: routes.tips,
      },
      {
        title: "Customer Testimonial",
        url: routes.testimonial,
      },
    ],
  },
];

export const socialLinks = [
  {
    icon: <FacebookIcon />,
    href: "",
  },
  {
    icon: <Twitter />,
    href: "",
  },
  {
    icon: <LinkedIn />,
    href: "",
  },
  {
    icon: <Instagram />,
    href: "",
  },
];
