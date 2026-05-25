import Container from "@/components/atoms/Container/Container";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import TrustCard from "@/components/molecules/TrustCard/TrustCard";

import { trustList } from "@/lib/constants";

const TrustSection = () => {
  return (
    <section className="md:pb-20 md:pt-15 pb-10 pt-7.5">
      <Container>
        <div className="sm:space-y-8 space-y-4">
          <SectionTitle title="Why you can trust Emilist" />
          <div className="flex items-center justify-center flex-wrap gap-8">
            {trustList?.map((trustItem) => (
              <TrustCard
                key={trustItem.id}
                title={trustItem.title}
                id={trustItem.id}
                desc={trustItem.desc}
                imgStyle={trustItem.imgStyle}
                imgUrl={trustItem.imgUrl}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustSection;
