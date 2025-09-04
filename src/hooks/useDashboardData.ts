import { useEffect, useState } from "react";
import { getDashboard, type DashboardData } from "@api/dashboard";

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
    try {
      setLoading(true);
      const res = await getDashboard();
      if (res.success) {
        setData(res.data);
        setError(null);
      } else {
        setError(res.message || "알 수 없는 오류");
      }
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
