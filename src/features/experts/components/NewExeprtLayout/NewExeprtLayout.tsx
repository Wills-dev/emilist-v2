import Image from "next/image";

import Container from "@/components/atoms/Container/Container";
import Logo from "@/components/atoms/Logo/Logo";
import UserInitial from "@/components/atoms/UserInitial/UserInitial";

const NewExeprtLayout = ({
  children,
  imgUrl = "/assets/images/profile-preview.svg",
}: {
  children: React.ReactNode;
  imgUrl?: string;
}) => {
  return (
    <div className="min-h-screen h-screen w-full flex flex-col">
      <div className="w-full border-b border-[#E5E5E5]">
        <Container>
          <header
            id="header"
            className="w-full flex justify-between items-center lg:gap-30 md:gap-20 lg:h-[12vh] h-[10vh]"
          >
            <Logo />
            <UserInitial />
          </header>
        </Container>
      </div>
      <Container variant="large">
        <div className="lg:h-[88vh] h-[90vh] w-full">
          <div className="flex h-full">
            <div className="max-w-156.25 w-full h-full min-h-full bg-linear-to-b from-0% from-[#25C269] to-100% to-[#125C32] flex justify-center items-center">
              <Image
                src={imgUrl}
                alt="preview"
                width={625}
                height={860}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-full flex-1 w-full overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewExeprtLayout;
