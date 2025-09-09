interface DifficultySelectorProps {
    difficulty: number
    setDifficulty: (value: number) => void
    max?: number
  }
  
  export default function DifficultySelector({ difficulty, setDifficulty, max = 5 }: DifficultySelectorProps) {
    return (
      <div className="flex items-center gap-4">
        <label className="font-medium text-gray-700">체감 난이도</label>
        <div className="flex items-center gap-2">

        {[...Array(max)].map((_, i) => {
          const n = i + 1
          return (
            <span
              key={n}
              onClick={() => setDifficulty(n)}
              className={`cursor-pointer text-lg ${n <= difficulty ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </span>
          )
        })}
        </div>
      </div>
    )
  }