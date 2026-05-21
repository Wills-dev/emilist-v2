import RotatingText from "../RotatingText/RotatingText";

const HeroTitle = () => {
  return (
    <h1
      className="text-center font-semibold font-exo text-[clamp(2rem,5vw,3.375rem)]
  leading-[clamp(2.5rem,6vw,4.5rem)] tracking-normal overflow-hidden w-full"
    >
      Find trusted, verified <RotatingText /> around you for projects, in
      minutes
    </h1>
  );
};

export default HeroTitle;
