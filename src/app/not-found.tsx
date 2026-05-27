import Image from "next/image";

import Button from "@/components/atoms/Button/Button";
import Container from "@/components/atoms/Container/Container";
import ArrowUp from "@/components/atoms/icons/ArrowUp";
import AppSection from "@/components/organisms/AppSection/AppSection";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

import { routes } from "@/lib/helpers/routes";

const NotFoundPage = () => {
  return (
    <MainLayout>
      <Container>
        <div className="flex justify-between max-lg:flex-col-reverse max-lg:items-center  gap-10 sm:py-20 py-10">
          <div className="max-w-157 w-full min-w-72.5 sm:space-y-10 space-y-6 sm:pt-16 pt-8">
            <div className="space-y-4">
              <h4 className="font-exo font-semibold sm:text-[54px] text-[40px] sm:leading-18 leading-10">
                ...Oops!, We can’t seem to find that page
              </h4>
              <p className="leading-7 tracking-[-3%] max-sm:text-sm">
                This could mean that you’ve clicked an expired page or listing
                with broken links. It could also be a network or connection
                issue. Kindly try again or return to the homepage.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {" "}
              <Button variant="secondary">Try Again</Button>
              <Button href={routes?.home} variant="primary">
                <span className="block">Return to Homepage</span>
                <ArrowUp />
              </Button>
            </div>
          </div>
          <div className="max-w-[580.57px] w-full min-w-72.5 sm:h-[543.17px] h-70">
            <Image
              src="/assets/images/404.svg"
              alt="404"
              width={580.57}
              height={543.17}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </Container>
      <AppSection />
    </MainLayout>
  );
};

export default NotFoundPage;
