import api from "./axiosInstance";

export type Priority = "낮음" | "보통" | "높음" | "긴급";

export interface Recommendation {
  id: number;
  title: string;
  categories: string[];
  createdAt: string;
  priority: Priority;
}

export interface RecentIdea {
  id: number;
  recordId: number;
  problemTitle: string;
  categories: string[];
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
  categoryDistribution: CategoryDistributionItem[];
  records: StreakRecord[];
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
  const res = await api.get("/users/me/dashboard", { signal });
  return res.data as DashboardResponse;
};

export interface StreakRecord {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface StreakResponse {
  success: boolean;
  message: string;
  data: {
    userId: number;
    startDate: string;
    endDate: string;
    records: StreakRecord[];
    totalCount: number;
  };
}

/** 잔디 그래프 */
export const getStreakData = async (
  signal?: AbortSignal
): Promise<StreakResponse> => {
  const res = await api.get("/users/me/streak", { signal });
  return res.data as StreakResponse;
};

export interface CategoryDistributionItem {
  slug: string;
  name: string;
  count: number;
  ratio: number;
}

export interface CategoryDistributionResponse {
  success: boolean;
  message: string;
  data: CategoryDistributionItem[];
}

/** 카테고리 데이터 조회 */
export const getCategoryDistribution = async (
  signal?: AbortSignal
): Promise<CategoryDistributionResponse> => {
  const res = await api.get("/users/me/categories", { signal });
  return res.data as CategoryDistributionResponse;
};
