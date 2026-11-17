"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { trackReportEvent } from "../api/recordReportEvent";
import type { ReportSubject } from "../helpers/reportEvents";
const observed = new WeakMap<Element, string>();
export const useResourceTracking = <T extends HTMLElement = HTMLDivElement>(subject: ReportSubject, enabled = true) => {
  const ref = useRef<T>(null);
  const id = subject.resourceType === "profile" ? subject.subjectUserId : subject.resourceId;
  const resourceType = subject.resourceType;
  const identity = `${resourceType}:${id}`;
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !id || !element || observed.get(element) === identity || typeof IntersectionObserver === "undefined") return;
    let active = true;
    const observer = new IntersectionObserver((entries) => {
      if (!active || observed.get(element) === identity || !entries.some((entry) => entry.isIntersecting)) return;
      observed.set(element, identity);
      trackReportEvent("impression", resourceType === "profile" ? { resourceType, subjectUserId: id } : { resourceType, resourceId: id });
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => { active = false; observer.disconnect(); };
  }, [enabled, id, resourceType, identity]);
  const click = (event: MouseEvent<HTMLElement>) => {
    if (!enabled || !id || !(event.target instanceof Element)) return;
    const anchor = event.target.closest("a[href]");
    if (!anchor) return;
    const path = new URL((anchor as HTMLAnchorElement).href, window.location.origin).pathname;
    // Only a resource's own detail link counts; profile/review/compare links do not.
    if (!path.endsWith(`/${encodeURIComponent(id)}`)) return;
    trackReportEvent("click", subject);
  };
  return { ref, click };
};
