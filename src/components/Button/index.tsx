import React, { type ButtonHTMLAttributes, type ReactNode } from "react"
import clsx from "clsx"
import { useNavigate } from "react-router-dom"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  theme?: "dark" | "light" | "white" | "red"
  href?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  theme = "light",
  href,
  className,
  ...props
}) => {
  const navigate = useNavigate()
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 rounded font-medium transition-colors cursor-pointer"
  const colorClasses: Record<string, string> = {
    dark: "bg-black text-white hover:bg-gray-800",
    light: "bg-gray-50 border-1 border-gray-200 text-black hover:bg-gray-100",
    white: "bg-white border-1 border-gray-200 text-black hover:bg-gray-100",
    red: "bg-red-500 text-white hover:bg-red-300"
  }
  const finalClass = clsx(baseStyle, colorClasses[theme], className)

  return (
    <button
      className={finalClass}
      onClick={() => {
        if (href) navigate(href)
        if (props.onClick) props.onClick()
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button