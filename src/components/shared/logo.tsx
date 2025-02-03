import React, { FC } from "react";
import clsx from "clsx";
import { ShoppingCartIcon } from "lucide-react";

interface LogoProps {
  width: string;
  height: string;
  className?: string;
}

const Logo: FC<LogoProps> = ({ width, height, className }) => {
  return (
    <div
      className={clsx(
        "z-50 flex flex-col items-center justify-center gap-2 font-bold",
        className
      )}
      style={{ width, height }}
    >
      {/* <Image src={LogoImg} alt="logo-img" className={clsx("w-full h-full object-cover overflow-visible", className)} /> */}
      <ShoppingCartIcon
        className={clsx("w-full h-full object-cover overflow-visible")}
      />
      BazaarOS
    </div>
  );
};

export default Logo;
