import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Service = "jobs" | "materials" | "experts";

const isService = (value: string | null): value is Service =>
  value === "jobs" || value === "materials" || value === "experts";

export const useServiceSection = () => {
  const [currentService, setCurrentService] = useState<Service>("jobs");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const syncServiceFromUrl = () => {
      const service = new URLSearchParams(window.location.search).get(
        "service",
      );
      setCurrentService(isService(service) ? service : "jobs");
    };

    syncServiceFromUrl();
    window.addEventListener("popstate", syncServiceFromUrl);

    return () => window.removeEventListener("popstate", syncServiceFromUrl);
  }, []);

  const handleServiceChange = (service: Service) => {
    setCurrentService(service);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("service", service);
    router.replace(`${pathname}?${searchParams.toString()}`, {
      scroll: false,
    });
  };

  return { currentService, handleServiceChange };
};
