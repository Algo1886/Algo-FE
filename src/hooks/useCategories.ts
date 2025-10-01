import { useEffect, useState } from "react"
import { fetchCategories } from "@api/records"

interface Category {
    id: number
    name: string
  }
  
  export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
  
    useEffect(() => {
      const load = async () => {
        try {
          setLoading(true)
          const data = await fetchCategories()
          setCategories(data.data)
        } catch (err) {
          setError(err as Error)
        } finally {
          setLoading(false)
        }
      }
      load()
    }, [])
  
    const getCategoryLabel = (id: number) => {
      const category = categories.find(c => c.id == id)
      return category ? category.name : "알 수 없음"
    }
  
    return { categories, loading, error, getCategoryLabel }
  }