export interface Account {
  name: string;
  id: string;
}

export interface SpendDataPoint {
  date: string;
  amount: number;
  projected: number;
}

export interface Spend {
  projected: {
    amount: number;
    currency: string;
    percentageChange: number;
    trend: string;
    comparedTo: string;
  };
  current: {
    amount: number;
    currency: string;
    period: string;
    periodLabel: string;
  };
  timeSeries: SpendDataPoint[];
}

export interface Savings {
  available: {
    amount: number;
    currency: string;
    yearlyEquivalent: number;
    description: string;
    actionLabel: string;
    actionUrl: string;
  };
  reshaping: {
    amount: number;
    currency: string;
    yearlyEquivalent: number;
    description: string;
    tooltip: string;
  };
  anomalies: {
    count: number;
    estimatedCostImpact: number;
    currency: string;
    description: string;
    severity: {
      high: number;
      medium: number;
      low: number;
    };
    tooltip: string;
  };
}

export interface Utilization {
  organizationName: string;
  organizationColor: string;
  monthToDateSavings: number;
  currency: string;
  percentage: number;
  target: number;
  status: string;
  tooltip: string;
}

export interface Reservation {
  id: string;
  type: string;
  category: string;
  instance: string;
  endDate: string;
  startDate: string;
  costPerHour: number;
  mtdSavings: number;
  currency: string;
  managedByNorth: boolean;
  status: string;
  utilizationPercent: number;
}

export interface DashboardData {
  account: Account;
  spend: Spend;
  savings: Savings;
  utilization: Utilization;
  reservations: Reservation[];
}

export enum LightMode {
  light = "light",
  dark = "dark",
}
