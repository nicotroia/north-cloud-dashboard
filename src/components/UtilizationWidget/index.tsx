import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { Utilization } from "@/types";
import { Text } from "@/components/Text";
import { useAppState } from "@/hooks/useAppState";
import { cx } from "@/helpers";
import { EnterTransition } from "../EnterTransition";
import CountUp from "react-countup";

interface UtilizationWidgetProps {
  utilization?: Utilization;
  className?: string;
}

export const UtilizationWidget = (props: UtilizationWidgetProps) => {
  const { utilization, className } = props;

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const { lightMode } = useAppState();

  useEffect(() => {
    if (!chartRef.current) return;
    if (!utilization?.percentage) return;

    const isDark = lightMode === "dark";
    chartInstance.current = echarts.init(chartRef.current, lightMode);

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          center: ["50%", "80%"],
          radius: "110%",
          min: 0,
          max: 100,
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              width: 12,
              color: [
                [0.3, "#ef4444"],
                [0.7, "#f59e0b"],
                [1, "#10b981"],
              ],
            },
          },
          pointer: {
            icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
            length: "12%",
            width: 10,
            offsetCenter: [0, "-60%"],
            itemStyle: {
              color: "#9333ea",
            },
          },
          axisTick: {
            length: 8,
            lineStyle: {
              color: "auto",
              width: 1,
            },
          },
          splitLine: {
            length: 12,
            lineStyle: {
              color: "auto",
              width: 2,
            },
          },
          axisLabel: {
            color: isDark ? "#9ca3af" : "#6b7280",
            fontSize: 10,
            distance: -40,
            formatter: (value: number) => {
              if (value === 0 || value === 50 || value === 100) {
                return value.toString();
              }
              return "";
            },
          },
          title: {
            offsetCenter: [0, "-10%"],
            fontSize: 14,
            color: isDark ? "#9ca3af" : "#6b7280",
          },
          detail: {
            fontSize: 28,
            offsetCenter: [0, "-35%"],
            valueAnimation: true,
            formatter: "{value}%",
            color: isDark ? "#fff" : "#000",
          },
          data: [
            {
              value: utilization.percentage,
              name: "Utilization",
            },
          ],
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      if (chartInstance.current && chartRef.current) {
        chartInstance.current.resize({
          width: chartRef.current.offsetWidth,
          height: chartRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [utilization?.percentage, lightMode]);

  if (!utilization) {
    return (
      <div
        className={cx(
          "rounded-2xl border border-web-border bg-web-content p-6",
          className
        )}
      >
        <div className="mb-2 h-5 w-32 animate-pulse rounded bg-web-content-dim" />
        <div className="mb-8 h-5 w-32 animate-pulse rounded bg-web-content-dim" />
        <div className="h-48 w-full animate-pulse rounded bg-web-content-dim" />
      </div>
    );
  }

  const savingsSign = utilization.monthToDateSavings >= 0 ? "+" : "";

  return (
    <div
      className={cx(
        "flex flex-col rounded-2xl border border-web-border bg-web-content p-6",
        className
      )}
    >
      <div className="flex flex-row items-start justify-between">
        <div className="mb-3">
          <Text as="div" size="sm">
            Account
          </Text>
          <Text as="div" size="xl">
            {utilization.organizationName}
          </Text>
        </div>
        <div className="mb-2">
          <Text as="div" size="sm">
            MTD Savings
          </Text>
          <div className="relative min-w-[105px]">
            <EnterTransition
              absolute
              visible={!!utilization.monthToDateSavings}
              delay={650}
            >
              <Text size="2xl">
                <CountUp
                  start={0.0}
                  end={Math.abs(utilization.monthToDateSavings)}
                  delay={0.65}
                  duration={0.5}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix="$"
                />
              </Text>
            </EnterTransition>
          </div>
        </div>
      </div>
      <div ref={chartRef} className="h-[210px] w-full min-w-0" />
    </div>
  );
};
