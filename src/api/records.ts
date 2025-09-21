import api from "./axiosInstance";
import axios from "axios";

export interface FetchRecordsParams {
  page?: number;
  size?: number;
  sort?: "LATEST" | "POPULAR";
  category?: string;
  search?: string;
  author?: string;
  startDate?: string;
  endDate?: string;
  validDateRange?: boolean;
}

export const fetchRecords = async (params: FetchRecordsParams = {}) => {
  const res = await api.get("/records", { params: { ...params } });
  return res.data;
};

export const createRecord = async (record: any) => {
  const res = await api.post("/records", record);
  return res.data;
};

export const fetchRecordById = async (id: number) => {
  const res = await api.get(`/records/${id}`);
  return res.data;
};

export const fetchBookmarks = async () => {
  const res = await api.get("/bookmarks");
  return res.data;
};

export const deleteRecordById = async (id: number) => {
  const res = await api.delete(`/records/${id}`);
  return res.data;
};

export const editRecord = async (id: number, record: any) => {
  const res = await api.put(`/records/${id}`, record);
  return res.data;
};

export const createBookmarkById = async (id: number) => {
  const res = await api.post(`/bookmarks/${id}`);
  return res.data;
};

export const deleteBookmarkById = async (id: number) => {
  const res = await api.delete(`/bookmarks/${id}`);
  return res.data;
};

export const extractProblemId = (url: string): string | null => {
  const match = url.match(/\/problem\/(\d+)/);
  return match ? match[1] : null;
};

export const fetchProblemTitle = async (problemId: string) => {
  const options = {
    method: "GET",
    url: "/solvedac/problem/show",
    params: { problemId: problemId },
    headers: { "x-solvedac-language": "ko", Accept: "application/json" },
  };

  try {
    const res = await axios.request(options);
    return res.data.titleKo;
  } catch (error) {
    console.error(error);
  }
};

export const postReviewComplete = async (recordId: string) => {
  // /api/users/me/reviews/{recordId}
  const res = await api.post(`/users/me/reviews/${recordId}`);
  return res.data;
};
