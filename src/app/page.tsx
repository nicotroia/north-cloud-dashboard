"use client";

import { useEffect, useState } from "react";

import { fetchDashboardData } from "@/lib/api";
import { DashboardData } from "@/types";
import { SpendOverview } from "@/components/SpendOverview";
import { SavingsCards } from "@/components/SavingsCards";
import { UtilizationWidget } from "@/components/UtilizationWidget";
import { ReservationsTable } from "@/components/ReservationTable";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // setLoading(true);
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error(err);
      } finally {
        // setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen max-w-content-max mx-auto self-center bg-web-background pb-36">
      <Navbar />

      <main className="mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 rounded-lg border border-web-border bg-web-content p-6 text-center">
            <Text as="p" className="mb-4">
              {error}
            </Text>
            <Button onClick={() => window.location.reload()}>
              <Text as="span">Retry</Text>
            </Button>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
            <SpendOverview
              spend={data?.spend}
              className="col-span-6 md:col-span-3 lg:col-span-4"
            />
            <UtilizationWidget
              utilization={data?.utilization}
              className="col-span-6 md:col-span-3 lg:col-span-2"
            />

            <div className="col-span-6 lg:col-span-6">
              <SavingsCards savings={data?.savings} />
            </div>
            <div></div>
          </div>

          <ReservationsTable reservations={data?.reservations} />
        </div>
      </main>
    </div>
  );
}
