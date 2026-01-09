import { LightMode } from "@/types";

export type Period = "7d" | "14d" | "30d";

export type UseAppStateProviderProps = {
  children?: React.ReactNode;
};

export type UseAppStateConsumerProps = {
  lightMode: LightMode;
  setLightMode: (lightMode: LightMode) => void;
  period: Period;
  setPeriod: (period: Period) => void;
};
