"use client";

import Container from "@/components/atoms/Container/Container";
import WatchEmilist from "@/components/atoms/WatchEmilist/WatchEmilist";
import HeroContent from "@/components/molecules/HeroContent/HeroContent";
import HeroServiceContent from "@/components/molecules/HeroServiceContent/HeroServiceContent";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";

import { useGeneralSearch } from "@/lib/hooks/useGeneralSearch";

const HeroSection = () => {
  const { handleSubmit, setSearch } = useGeneralSearch();

  return (
    <section className="py-10">
      <Container>
        <div className="flex flex-col items-center justify-center  w-full gap-4">
          <WatchEmilist />
          <HeroContent />
          <SearchBar
            setSearch={setSearch}
            onSubmit={handleSubmit}
            placeholder="Search for job opportunities, experts or materials"
          />
        </div>
        <HeroServiceContent />
      </Container>
    </section>
  );
};

export default HeroSection;
