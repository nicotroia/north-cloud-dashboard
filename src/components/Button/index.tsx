import React, { ButtonHTMLAttributes } from "react";

import { Text } from "@/components/Text";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { cx } from "@/helpers";

import sharedStyles from "@/styles/shared.module.scss";

export type ButtonProps = {
  href?: string;
  className?: string;
  disabled?: boolean;
  pending?: boolean;
  target?: string;
} & ButtonHTMLAttributes<
  HTMLButtonElement | HTMLAnchorElement | HTMLInputElement
>;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    href,
    type = "button",
    className,
    disabled,
    pending,
    children,
    ...rest
  } = props;

  const content = pending ? (
    <LoadingSpinner className="size-6 border-2" />
  ) : (
    children
  );

  if (href) {
    return (
      <a
        href={href}
        {...rest}
        className={cx(
          "inline-flex justify-center rounded-md px-5 py-2",
          "min-h-8",
          "border border-solid border-web-primary-dim",
          !disabled && "hover:bg-web-primary-dim",
          sharedStyles.interactive,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {typeof content === "string" ? (
          <Text className="text-web-readable">{content}</Text>
        ) : (
          content
        )}
      </a>
    );
  }

  return (
    <button
      type={type}
      {...rest}
      aria-disabled={disabled}
      disabled={disabled}
      className={cx(
        "inline-flex justify-center rounded-md px-4 py-2",
        "min-h-input",
        "border border-solid border-web-primary-dim",
        !disabled && "hover:bg-web-primary-dim",
        sharedStyles.interactive,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {typeof content === "string" ? (
        <Text leading="none" className="text-web-readable-bright">
          {content}
        </Text>
      ) : (
        content
      )}
    </button>
  );
};
