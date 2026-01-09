import React from "react";

import { cx } from "@/helpers";

export type LoadingSpinnerProps = {
  className?: string;
  children?: React.ReactNode;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  const { className } = props;

  return (
    <div
      className={cx(
        "size-12 animate-spin rounded-full border-4 border-web-border border-t-web-primary mx-auto",
        className
      )}
    />
  );
};
