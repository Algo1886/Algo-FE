export interface Record {
  id: number;
  type: string;
  site: string;
  title: string;
  author: string;
  date: string;
}

export interface RecordResponse {
  records: Record[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
