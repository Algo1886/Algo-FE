import React, { type ButtonHTMLAttributes, type ReactNode } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  theme?: "dark" | "light"
  href?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  theme = "dark",
  href,
  className,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 rounded font-semibold transition-colors"

  const colorClasses: Record<string, string> = {
    dark: "bg-black text-white hover:bg-gray-800",
    light: "bg-gray-50 border-1 border-gray-200 text-black hover:bg-gray-100",
  }

  const finalClass = clsx(baseStyle, colorClasses[theme], className)

  if (href) {
    return (
      <Link to={href} className={finalClass}>
        {children}
      </Link>
    )
  }

  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  )
}

export default Button