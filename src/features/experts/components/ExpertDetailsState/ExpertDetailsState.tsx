import Container from "@/components/atoms/Container/Container";

export default function ExpertDetailsState({ error, retry }: { error: boolean; retry: () => void }) {
  return <Container variant="small" className="py-6">{error ? <div role="alert" className="space-y-3 p-4 text-sm"><p>Unable to load this expert’s profile.</p><button type="button" onClick={retry} className="text-[#18A154] underline">Try again</button></div> : <div role="status" aria-label="Loading expert profile" className="space-y-5 rounded-lg bg-[#F9F9F9] p-6 motion-safe:animate-pulse"><div className="h-7 w-1/2 rounded bg-[#E2E5E3]" /><div className="h-16 rounded bg-[#E2E5E3]" /><div className="h-72 rounded bg-[#E2E5E3]" /></div>}</Container>;
}
