import { useEffect, useRef } from "react";
import { ECharts, EChartsOption, init, graphic } from "echarts";
import { Spend } from "@/types";
import { Text } from "@/components/Text";
import { LoadingSpinner } from "../LoadingSpinner";
import { useAppState } from "@/hooks/useAppState";

import sharedStyles from "@/styles/shared.module.scss";
import { cx } from "@/helpers";
import { EnterTransition } from "../EnterTransition";
import CountUp from "react-countup";

interface SpendOverviewProps {
  spend?: Spend;
  className?: string;
}

export const SpendOverview = (props: SpendOverviewProps) => {
  const { spend, className } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ECharts | null>(null);
  const { lightMode, period, setPeriod } = useAppState();

  useEffect(() => {
    if (!chartRef.current) return;
    if (!spend?.timeSeries) return;

    const isDark = lightMode === "dark";
    chartInstance.current = init(chartRef.current, isDark ? "dark" : "light");

    const days = parseInt(period);
    const displayData = spend.timeSeries.slice(-days);

    const option: EChartsOption = {
      backgroundColor: "transparent",
      tooltip: {
        shadowBlur: 1,
        trigger: "axis",
        backgroundColor: isDark
          ? "rgba(0, 0, 0, 0.9)"
          : "rgba(255, 255, 255, 0.9)",
        borderColor: isDark ? "#686e78" : "#8c9498",
        textStyle: {
          color: isDark ? "#fff" : "#000",
        },
        formatter: (params: any) => {
          const param = params[0];
          return `${
            param.axisValue
          }<br/>Spend: $${param.value.toLocaleString()}`;
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: displayData.map((d) => {
          const date = new Date(d.date);
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }),
        axisLine: {
          lineStyle: {
            color: isDark ? "#374151" : "#d1d5db",
          },
        },
        axisLabel: {
          color: isDark ? "#9ca3af" : "#6b7280",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: isDark ? "#374151" : "#e5e7eb",
          },
        },
        axisLabel: {
          color: isDark ? "#9ca3af" : "#6b7280",
          formatter: (value: number) => `$${(value / 1000).toFixed(0)}k`,
        },
      },
      series: [
        {
          name: "Spend",
          type: "line",
          smooth: true,
          data: displayData.map((d) => d.amount),
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(147, 51, 234, 0.3)",
              },
              {
                offset: 1,
                color: "rgba(147, 51, 234, 0.0)",
              },
            ]),
          },
          lineStyle: {
            color: "#9333ea",
            width: 2,
          },
          itemStyle: {
            color: "#9333ea",
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [spend?.timeSeries, period, lightMode]);

  if (!spend) {
    return (
      <div
        className={cx(
          "rounded-2xl border border-web-border bg-web-content p-6",
          className
        )}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 h-5 w-32 animate-pulse rounded bg-web-content-dim" />
            <div className="h-10 mb-2 w-40 animate-pulse rounded bg-web-content-dim" />
            <div className="mt-1 mb-4 h-4 w-48 animate-pulse rounded bg-web-content-dim" />
          </div>
          <div className="h-8 w-20 animate-pulse rounded bg-web-content-dim" />
        </div>
        <div className="h-64 w-full animate-pulse rounded bg-web-content-dim flex items-center justify-center">
          <LoadingSpinner className="size-10" />
        </div>
      </div>
    );
  }

  const changeSign = spend.projected.percentageChange >= 0 ? "+" : "";

  return (
    <div
      className={cx(
        "rounded-2xl border border-web-border bg-web-content p-6",
        className
      )}
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-baseline gap-3">
            <Text
              as="h2"
              size="2xl"
              variant="primary"
              className="text-web-primary"
            >
              Projected Spend
            </Text>
            <EnterTransition visible={!!spend} delay={500}>
              <Text as="span" size="sm" className="relative text-web-success">
                <CountUp
                  start={0.0}
                  end={spend.projected.percentageChange}
                  delay={0.5}
                  duration={0.75}
                  decimals={2}
                  decimal="."
                  prefix={changeSign}
                  suffix="%"
                />
              </Text>
            </EnterTransition>
          </div>
          <Text as="div" size="4xl" variant="primary" leading="tight">
            ${spend.projected.amount.toLocaleString()}
          </Text>
          <Text as="div" size="sm" tracking="wide">
            Current: ${spend.current.amount.toLocaleString()}
          </Text>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as "7d" | "14d" | "30d")}
          className={cx(
            sharedStyles.interactive,
            "rounded border border-web-border bg-web-background px-2 py-1 text-sm text-web-readable focus-within:outline-none"
          )}
        >
          <option value="7d">7d</option>
          <option value="14d">14d</option>
          <option value="30d">30d</option>
        </select>
      </div>
      <div ref={chartRef} className="h-64 w-full" />
    </div>
  );
};
