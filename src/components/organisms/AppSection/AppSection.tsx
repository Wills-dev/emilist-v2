import Container from "@/components/atoms/Container/Container";
import DownloadBtn from "@/components/atoms/DownloadBtn/DownloadBtn";
import ArrowUp from "@/components/atoms/icons/ArrowUp";
import Image from "next/image";

const AppSection = () => {
  return (
    <section className="sm:py-20 py-10 bg-[#030A05]">
      <Container>
        <div className="flex items-enter justify-between flex-wrap gap-10">
          <div className="max-w-141 w-full min-w-72.5">
            <div className="w-full sm:space-y-8 space-y-4">
              <div className="sm:space-y-4 space-y-2">
                <div className="space-y-1">
                  <div className="sm:text-[40px] text-[30px] text-white">
                    <ArrowUp />
                  </div>
                  <h6 className="text-[#9EF769] sm:text-[36px] text-[28px] font-exo font-semibold">
                    Manage your projects on the go right from your mobile phone
                  </h6>
                </div>
                <p className="font-medium max-sm:text-sm tracking-[-3%] leading-7 text-[#FBFFF8]">
                  Never miss an update on your project, post new jobs, hire
                  experts, track your projects and handle all your payments from
                  your smartphone.
                </p>
              </div>
              <div className="sm:pt-5 pt-2 sm:space-y-4 space-y-2">
                <h6 className="tracking-[5%] leading-6 font-exo font-semibold sm:text-[18px] text-white">
                  GET THE APP
                </h6>
                <div className="flex items-center sm:gap-4 gap-2">
                  <DownloadBtn
                    href="http://"
                    alt="app store"
                    imgUrl="/assets/images/appStore.svg"
                    width={28}
                    height={28}
                  />
                  <DownloadBtn
                    href="http://"
                    alt="app store"
                    imgUrl="/assets/images/google-play.svg"
                    width={28}
                    height={28}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="max-lg:flex items-center justify-center max-lg:flex-1 max-sm:w-full">
            <div className="max-w-lg w-full min-w-72.5 sm:h-115 shadow-sm ">
              <Image
                src="/assets/images/phone-download.svg"
                alt="downloand"
                width={517}
                height={460}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AppSection;
