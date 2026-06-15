import Container from "@/components/atoms/Container/Container";
import Logo from "@/components/atoms/Logo/Logo";
import UserInitial from "@/components/atoms/UserInitial/UserInitial";

const FormNav = () => {
  return (
    <Container>
      <header
        id="header"
        className="w-full flex justify-between items-center lg:gap-30 md:gap-20 h-20"
      >
        <Logo />
        <UserInitial />
      </header>
    </Container>
  );
};

export default FormNav;
