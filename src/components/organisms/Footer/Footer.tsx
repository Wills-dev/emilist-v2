import clsx from "clsx";

import Container from "@/components/atoms/Container/Container";
import NewsLetter from "@/components/molecules/NewsLetter/NewsLetter";
import FooterWrapper from "@/components/molecules/FooterWrapper/FooterWrapper";

const Footer = ({
  variant = "primary",
}: {
  variant?: "primary" | "secondary";
}) => {
  const baseParentClassName = "sm:py-20 py-10";

  const variants = {
    primary: {
      parent: "bg-[#155231]",
    },
    secondary: {
      parent: "",
    },
  };

  const styles = variants[variant];

  return (
    <div className={clsx(styles.parent, baseParentClassName)}>
      <Container>
        <div className="space-y-10">
          <NewsLetter variant={variant} />
          <FooterWrapper />
        </div>
      </Container>
    </div>
  );
};

export default Footer;
