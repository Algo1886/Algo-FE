import api from "./axiosInstance";

export type Priority = "낮음" | "보통" | "높음" | "긴급";

export interface Recommendation {
  id: number;
  title: string;
  categories: string[];
  reviewDate: string;
  priority: Priority;
}

export interface RecentIdea {
  id: number;
  recordId: number;
  problemTitle: string;
  category: string;
  content: string;
  createdAt: string;
}

export interface DashboardData {
  recordCount: number;
  bookmarkCount: number;
  recommendations: Recommendation[];
  recentIdeas: RecentIdea[];

  streakDays?: number;
  successRate?: number;
  tagDistributionPercent?: Record<string, number>;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

/** 대시보드 조회 */
export const getDashboard = async (
  signal?: AbortSignal
): Promise<DashboardResponse> => {
  const res = await api.get("/api/dashboard");

  const json = res.data as DashboardResponse;

  return json;
};
