import { DashboardData } from "@/types";

const API_URL =
  "https://north-case-fe-dashboard-gs7l.preview.north.cloud/api/mock";
const API_KEY = process.env.NEXT_PUBLIC_NORTH_API_KEY;

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw error;
  }
}
