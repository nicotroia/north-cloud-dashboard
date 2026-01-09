import React from "react";

import { cx } from "@/helpers";

import {
  FontVariant,
  PossibleTag,
  TextLeading,
  TextSize,
  TextTracking,
  TextWeight,
} from "./types";

import styles from "./styles.module.scss";
import sharedStyles from "@/styles/shared.module.scss";

export type TextProps = {
  as?: PossibleTag;
  size?: TextSize;
  weight?: TextWeight;
  leading?: TextLeading;
  tracking?: TextTracking;
  variant?: FontVariant;
  truncate?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export const PossibleTags: PossibleTag[] = [
  "h1",
  "h2",
  "h3",
  "h6",
  "div",
  "span",
  "p",
];

export const PossbileVariants: Record<string, FontVariant> = {
  primary: "primary",
  body: "body",
  code: "code",
};

export const Text: React.FC<TextProps> = (props) => {
  const {
    as = "div",
    size = "md",
    weight = "normal",
    leading = "normal",
    tracking = "normal",
    variant = "body",
    truncate,
    className,
    children,
    style,
  } = props;

  const Component = as && PossibleTags.includes(as) ? as : "div";
  const sizeStyles = styles[`size-${size}`];
  const weightStyles = styles[`weight-${weight}`];
  const leadingStyles = styles[`lineHeight-${leading}`];
  const trackingStyles = styles[`letterSpacing-${tracking}`];
  const variantStyles = styles[`variant-${variant}`];
  const colorStyles = cx({
    "transition-colors duration-150": true,
    "text-web-readable": true,
    "text-web-primary": ["h1", "h2", "h3", "h4", "h5"].includes(as),
  });
  const classNames = cx(
    styles.text,
    styles[as],
    colorStyles,
    truncate && sharedStyles.truncate,
    sizeStyles,
    weightStyles,
    variantStyles,
    trackingStyles,
    leadingStyles,
    className,
    "font-mono"
  );

  return (
    <Component className={classNames} style={style}>
      {children}
    </Component>
  );
};
