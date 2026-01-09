import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import React, { useEffect } from "react";

import { LightMode } from "@/types";
import { GhostButton } from "@/components/GhostButton";
import { cx } from "@/helpers";
import { useAppState } from "@/hooks/useAppState";

export type Props = {
  className?: string;
};

export const LightSwitch: React.FC<Props> = (props) => {
  const { className } = props;

  const { lightMode, setLightMode } = useAppState();

  const isDark = lightMode === LightMode.dark;

  const handleClick = () => {
    setLightMode(
      lightMode === LightMode.dark ? LightMode.light : LightMode.dark
    );
  };

  useEffect(() => {
    if (lightMode === LightMode.dark)
      document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [lightMode]);

  return (
    <GhostButton
      tooltipId="light-switch-tooltip"
      tooltipContent={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      buttonClassName="size-10 min-w-10"
      onClick={handleClick}
      className={cx(className)}
    >
      {!isDark ? (
        <MoonIcon className={cx("fill-web-readable z-20 size-5")} />
      ) : (
        <SunIcon className={cx("fill-web-readable z-20 size-5")} />
      )}
    </GhostButton>
  );
};
