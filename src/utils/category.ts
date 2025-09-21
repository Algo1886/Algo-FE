export const CATEGORY_NAME_MAP: Record<string, string> = {
  dp: "DP",
  greedy: "그리디",
  backtracking: "백트래킹",
  "two-pointers": "투포인터",
  "prefix-sum": "누적합",
  dijkstra: "최단경로",
  "topological-sort": "위상정렬",
  bfs: "BFS",
  dfs: "DFS",
  "tree-basic": "트리",
  sorting: "정렬",
  searching: "탐색",
  "hash-map": "해시",
  "stack-queue-deque": "스택/큐",
  "string-basic": "문자열",
  array: "배열",
  ect: "기타",
};

export const getCategoryKoreanName = (slug: string): string => {
  return CATEGORY_NAME_MAP[slug] || slug;
};
