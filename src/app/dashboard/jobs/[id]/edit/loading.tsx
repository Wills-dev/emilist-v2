import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";

export default function Loading() {
  return (
    <CenteredFormLayout>
      <div
        className="min-h-160 w-full animate-pulse rounded-2xl bg-[#F7F8F7]"
        aria-label="Loading"
        aria-busy="true"
      />
    </CenteredFormLayout>
  );
}
