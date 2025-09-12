import { useEffect, useState } from "react";
import {
  getDashboard,
  getStreakData,
  getCategoryDistribution,
  type DashboardData,
} from "@api/dashboard";

interface UseDashboardDataResult {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDashboardData = (): UseDashboardDataResult => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const controller = new AbortController();
    const { signal } = controller;

    try {
      setLoading(true);

      const [dashboardRes, streakRes, categoryRes] = await Promise.all([
        getDashboard(signal),
        getStreakData(signal),
        getCategoryDistribution(signal),
      ]);

      const merged: DashboardData = {
        ...dashboardRes.data,
        streakDays:
          calculateStreakDays(streakRes.data.records) ??
          dashboardRes.data.streakDays,
        tagDistributionPercent: convertCategoryToTagDistribution(
          categoryRes.data
        ),
        records: streakRes.data.records,
      };

      setData(merged);
      setError(null);
    } catch (err: any) {
      setError(err.message || "에러 발생");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

const calculateStreakDays = (
  records: { date: string; count: number }[]
): number => {
  let streak = 0;

  // 날짜 desc
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));

  for (const record of sorted) {
    if (record.count > 0) streak++;
    else break;
  }

  return streak;
};

const convertCategoryToTagDistribution = (
  categories: { category: string; ratio: number }[]
): Record<string, number> => {
  return categories.reduce((acc, cur) => {
    acc[cur.category] = cur.ratio;
    return acc;
  }, {} as Record<string, number>);
};
