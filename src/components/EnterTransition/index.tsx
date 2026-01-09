import React, { useEffect } from "react";

import { cx } from "@/helpers";

export type EnterTransitionProps = {
  absolute?: boolean;
  visible?: boolean;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};

export const EnterTransition: React.FC<EnterTransitionProps> = (props) => {
  const {
    visible: _visible,
    delay = 300,
    absolute,
    className,
    children,
  } = props;

  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    let cancel: NodeJS.Timeout | null = null;
    if (_visible) {
      cancel = setTimeout(() => setVisible(true), delay);
    }
    return () => {
      if (cancel) clearTimeout(cancel);
    };
  }, [_visible, delay]);

  return (
    <div
      className={cx(
        visible
          ? "opacity-100 translate-y-0 ease-out duration-300 transition-all"
          : "opacity-0 -translate-y-4",
        absolute ? "absolute inset-0" : "",
        className
      )}
    >
      {children}
    </div>
  );
};
