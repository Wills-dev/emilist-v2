import Image from "next/image";

import Container from "@/components/atoms/Container/Container";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import CustomerServiceCard from "@/components/molecules/CustomerServiceCard/CustomerServiceCard";

import { routes } from "@/lib/helpers/routes";

const CustomerServiceSection = () => {
  return (
    <section className="sm:py-20 py-1">
      <Container>
        <div className="flex items-center justify-center gap-10 flex-wrap">
          <div className="max-w-157 w-full min-w-72.5">
            <div className="sm:space-y-12 space-y-8">
              <div className="space-y-2">
                <SectionTitle title="Request for custom services" />
                <p className="tracking-[-3%] leading-6 font-medium max-sm:text-sm ">
                  Need something beyond a one-time job? We support scheduled,
                  recurring and custom service arrangements designed around your
                  operational or business needs
                </p>
              </div>
              <div className="space-y-4">
                <CustomerServiceCard
                  href={routes?.bookService}
                  title="Schedule a service"
                />
                <CustomerServiceCard
                  href={routes?.bookMaintenance}
                  title="Book maintenance services"
                />
                <CustomerServiceCard
                  href={routes?.bookMeeting}
                  title="Schedule a meeting"
                />
              </div>
              ;
            </div>
          </div>
          <div className="max-w-153 min-w-72.5 w-full sm:h-135 h-70 rounded-[16px] bg-[#D9D9D9] overflow-hidden">
            <Image
              src="/assets/images/customer.svg"
              alt=""
              width={612}
              height={540}
              className="w-full h-auto"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CustomerServiceSection;
