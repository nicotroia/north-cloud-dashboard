import React, { ButtonHTMLAttributes } from "react";

import { Tooltip } from "@/components/Tooltip";
import { cx } from "@/helpers";

import sharedStyles from "@/styles/shared.module.scss";

export type GhostButtonProps = {
  tooltipId?: string;
  tooltipContent?: string;
  active?: boolean;
  children?: React.ReactNode;
  buttonClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const GhostButton: React.FC<GhostButtonProps> = (props) => {
  const {
    name,
    tooltipId = "ghost-button-tooltip",
    tooltipContent,
    active,
    className,
    buttonClassName,
    children,
    ...rest
  } = props;

  return (
    <div className={cx("flex relative rounded-lg", className)}>
      <button
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        data-tooltip-place="bottom"
        {...rest}
        className={cx(
          sharedStyles.buttonReset,
          sharedStyles.interactive,
          "w-full h-full flex items-center justify-center rounded-lg",
          !props.disabled && "hover:bg-web-primary-dim",
          active && "bg-web-primary-dim",
          buttonClassName
        )}
      >
        {children}
      </button>
      {tooltipId ? (
        <Tooltip id={tooltipId} place="left" className="z-80" />
      ) : null}
    </div>
  );
};
