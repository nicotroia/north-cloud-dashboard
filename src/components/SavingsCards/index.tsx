"use client";

import { Savings } from "@/types";
import { Text } from "@/components/Text";
import { Button } from "../Button";
import CountUp from "react-countup";
import { EnterTransition } from "../EnterTransition";

interface SavingsCardsProps {
  savings?: Savings;
}

export const SavingsCards = ({ savings }: SavingsCardsProps) => {
  if (!savings) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-web-border bg-web-content p-6"
          >
            <div className="mb-5 h-4 w-32 animate-pulse rounded bg-web-content-dim" />
            <div className="mb-3 h-8 w-24 animate-pulse rounded bg-web-content-dim" />
            <div className="h-4 w-36 animate-pulse rounded bg-web-content-dim" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="rounded-2xl border border-web-border bg-web-content p-6">
        <Text
          size="xl"
          leading="tight"
          variant="primary"
          className="mb-2 text-web-primary"
        >
          Available Savings
        </Text>
        <EnterTransition visible={!!savings.available} delay={800}>
          <Text size="3xl" className="mb-1">
            <CountUp
              start={0.0}
              end={savings.available.amount}
              delay={0.8}
              duration={0.5}
              separator=","
              decimals={2}
              decimal="."
              prefix="$"
            />
          </Text>
        </EnterTransition>

        <Text size="sm">
          ${savings.available.yearlyEquivalent.toLocaleString()}/yr potential
        </Text>

        <Button className="w-full py-0 mt-3" href="/savings">
          <Text as="span" leading="loose" size="sm">
            See how
          </Text>
        </Button>
      </div>

      <div className="rounded-2xl border border-web-border bg-web-content p-6">
        <Text
          size="xl"
          leading="tight"
          variant="primary"
          className="mb-2 text-web-primary"
        >
          Reshaping Savings
        </Text>
        <EnterTransition visible={!!savings.available} delay={1100}>
          <Text size="3xl" className="mb-1">
            <CountUp
              start={0.0}
              end={savings.reshaping.amount}
              delay={1.1}
              duration={0.5}
              separator=","
              decimals={2}
              decimal="."
              prefix="$"
            />
          </Text>
        </EnterTransition>
        <Text size="sm">
          ${savings.reshaping.yearlyEquivalent.toLocaleString()}/yr potential
        </Text>

        <Button className="w-full py-0 mt-3" href="/savings">
          <Text as="span" leading="loose" size="sm">
            See how
          </Text>
        </Button>
      </div>

      <div className="rounded-2xl border border-web-border bg-web-content p-6">
        <Text
          size="xl"
          leading="tight"
          variant="primary"
          className="mb-2 text-web-primary"
        >
          Anomalies Detected
        </Text>
        <EnterTransition visible={!!savings.available} delay={1300}>
          <Text size="3xl" className="mb-1">
            <CountUp
              start={0.0}
              end={savings.anomalies.count}
              delay={1.3}
              duration={0.5}
              separator=","
              decimals={2}
              decimal="."
              prefix="$"
            />
          </Text>
        </EnterTransition>
        <Text size="sm">
          ${savings.anomalies.estimatedCostImpact.toLocaleString()} estimated
          impact
        </Text>

        <Button className="w-full py-0 mt-3" href="/savings">
          <Text as="span" leading="loose" size="sm">
            See how
          </Text>
        </Button>
      </div>
    </div>
  );
};
