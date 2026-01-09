import React from "react";

import { cx } from "@/helpers";
import { LightSwitch } from "@/components/LightSwitch";
import { NorthWordSvg } from "@/components/_svg/NorthWordSvg";
import { NorthSymbol } from "@/components/_svg/NorthSymbolSvg";
import { useAppState } from "@/hooks/useAppState";
import { LightMode } from "@/types";

export type NavbarProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Navbar: React.FC<NavbarProps> = (props) => {
  const { className } = props;

  const { lightMode } = useAppState();

  return (
    <header
      className={cx(
        "w-full mx-auto flex flex-row gap-4 items-start justify-between",
        "px-6 py-8",
        "sticky top-0 z-50",
        "bg-gradient-to-b from-web-background to-white/0 dark:to-black/0",
        className
      )}
    >
      <div className="flex flex-col flex-1 items-start self-start gap-2 max-w-content-max">
        <div className="flex flex-row items-start gap-1">
          <NorthWordSvg
            fill={lightMode === LightMode.dark ? "#F8FCFD" : "#3b3b3b"}
            className="w-[110px] h-[40px]"
          />
          <NorthSymbol className="w-[20px] h-[20px]" />
        </div>
      </div>
      <div className="self-center">
        <LightSwitch />
      </div>
    </header>
  );
};
