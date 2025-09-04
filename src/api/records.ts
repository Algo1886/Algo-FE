import api from "./axiosInstance"

export interface FetchRecordsParams {
  page?: number
  size?: number
  sort?: "LATEST" | "POPULAR"
  category?: string
  search?: string
  author?: string
  startDate?: string
  endDate?: string
  validDateRange?: boolean
}

export const fetchRecords = async (params: FetchRecordsParams = {}) => {
  const res = await api.get("/records", { params: {...params } })
  return res.data
}

export const createRecord = async (record: any) => {
  const res = await api.post("/records", record)
  return res.data
}

export const fetchRecordById = async (id: number) => {
  const res = await api.get(`/records/${id}`)
  return res.data
}

export const fetchBookmarks = async () => {
  const res = await api.get("/bookmarks")
  return res.data
}

export const deleteRecordById = async (id: number) => {
  const res = await api.delete(`/records/${id}`)
  return res.data
}

export const editRecord = async (id: number, record: any) => {
  const res = await api.put(`/records/${id}`, record)
  return res.data
}


export const createBookmarkById = async (id: number) => {
  const res = await api.post(`/bookmarks/${id}`)
  return res.data
}

export const deleteBookmarkById = async (id: number) => {
  const res = await api.delete(`/bookmarks/${id}`)
  return res.data
}