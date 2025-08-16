"use client"

import React from "react"
import { useFormStatus } from "react-dom"
import Spinner from "@modules/common/icons/spinner"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  const baseStyles = "py-4 text-[12px] tracking-[1.5px] uppercase font-medium transition-all duration-200 flex items-center justify-center gap-2"
  
  const variantStyles = {
    primary: "bg-[#1A1A1A] text-white hover:bg-black",
    secondary: "bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white",
    transparent: "bg-transparent text-[#1A1A1A] hover:text-[#666]",
    danger: "bg-red-600 text-white hover:bg-red-700"
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant || "primary"]} ${className || ""} ${pending ? 'opacity-75 cursor-not-allowed' : ''}`}
      type="submit"
      disabled={pending}
      data-testid={dataTestId}
    >
      {pending && <Spinner />}
      {children}
    </button>
  )
}
