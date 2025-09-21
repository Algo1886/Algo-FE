interface DifficultySelectorProps {
  difficulty: number
  setDifficulty: (value: number) => void
  max?: number
  required?: boolean
  showError?: boolean
}

export default function DifficultySelector({
  difficulty,
  setDifficulty,
  max = 5,
  required = false,
  showError = false,
}: DifficultySelectorProps) {
  const isError = required && showError && difficulty === 0

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">
          체감 난이도 {required && <span className="text-blue-500">*</span>}
        </label>
        <div className="flex h-10 items-center gap-2">
          {[...Array(max)].map((_, i) => {
            const n = i + 1
            return (
              <span
                key={n}
                onClick={() => setDifficulty(n)}
                className={`cursor-pointer text-lg ${
                  n <= difficulty ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            )
          })}
        </div>
      </div>
      {isError && (
        <span className="text-red-500 text-sm">난이도를 선택해주세요</span>
      )}
    </div>
  )
}