import React from "react";

export type NorthSymbolProps = {
  fill?: string;
  className?: string;
  children?: React.ReactNode;
};

export const NorthSymbol: React.FC<NorthSymbolProps> = (props) => {
  const { fill = "#D591FE", className } = props;

  return (
    <svg
      viewBox="0 0 21 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 10.4029V13.5622L10.0533 11.8439L20.1067 13.5622V10.4029L10.0533 7.1062L0 10.4029Z"
        fill={fill}
      />
      <path
        d="M10.0533 0L0 5.66375V8.82325L10.0533 4.73766L20.1067 8.82325V5.66375L10.0533 0Z"
        fill={fill}
      />
    </svg>
  );
};
