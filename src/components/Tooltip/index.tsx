import React, { forwardRef } from "react";
import { Tooltip as RTooltip, TooltipRefProps } from "react-tooltip";

import { cx } from "@/helpers";

export type Props = {
  id?: string;
  effect?: "float" | "solid";
  offset?: { top?: number; right?: number; left?: number; bottom?: number };
  className?: string;
  style?: React.CSSProperties;
} & Omit<TooltipRefProps, "open" | "close" | "activeAnchor" | "isOpen">;

export const Tooltip = forwardRef((props: Props, ref: any) => {
  const { effect, offset, className, style, ...rest } = props;

  return (
    <RTooltip
      offset={10}
      style={style}
      {...rest}
      className={cx("rounded-md py-1 px-3 z-80", className)}
    />
  );
});
