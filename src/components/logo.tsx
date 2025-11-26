import { Rethink_Sans } from "next/font/google";

const rethink = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type LogoProps = {
  variant?: "vertical" | "horizontal"; // default = vertical
  size?: "sm" | "md" | "lg"; // opcional para controlar tamanho em cada lugar
};

export const Logo = ({ variant = "vertical", size = "lg" }: LogoProps) => {
  const isHorizontal = variant === "horizontal";

  // tamanhos que escalam conforme uso
  const textSize =
    size === "sm" ? "text-2xl"
    : size === "md" ? "text-4xl"
    : "text-7xl"; // lg padrão (home)

  return (
    <div
      className={`${rethink.className} flex items-center gap-1 ${
        isHorizontal ? "flex-row" : "flex-col items-start"
      }`}
    >
      <p className={`${textSize} text-green-700 italic`}>My</p>
      <p className={`${textSize} text-black italic`}>Finance</p>
    </div>
  );
};

export default Logo;
