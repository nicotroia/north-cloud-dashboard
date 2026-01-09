import React, { createContext, useContext, useState } from "react";

import {
  UseAppStateConsumerProps,
  UseAppStateProviderProps,
} from "@/hooks/useAppState/types";
import { LightMode } from "@/types";

const AppStateContext = createContext<UseAppStateConsumerProps>({
  lightMode: LightMode.dark,
  setLightMode: (mode: LightMode) => {},
  period: "30d",
  setPeriod: () => {},
});

export const AppStateProvider = (props: UseAppStateProviderProps) => {
  const { children } = props;

  const [lightMode, setLightMode] = useState(LightMode.dark);
  const [period, setPeriod] = useState<"7d" | "14d" | "30d">("30d");

  return (
    <AppStateContext.Provider
      value={{
        lightMode,
        setLightMode,
        period,
        setPeriod,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }

  return context;
};
