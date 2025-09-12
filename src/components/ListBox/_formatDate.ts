export const formatDate = (dateStr: string) => {
    const parts = dateStr
      .replace(/\./g, " ")
      .split(" ")
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
    // ["2025", "9", "4", "오후", "5:45:00"]
  
    const year = parts[0]
    const month = parts[1].padStart(2, "0")
    const day = parts[2].padStart(2, "0")
  
    return `${year}/${month}/${day}`
  }