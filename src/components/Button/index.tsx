import React from "react"
import { Button as NextButton } from "@nextui-org/react"
type Props = {
  children: React.ReactNode
  isLoading?: boolean
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean

  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

export const Button = ({
  children,
  className,
  color,
  fullWidth,
  icon,
  type,
  isLoading,
}: Props) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
      isLoading={isLoading}
    >
      {children}
    </NextButton>
  )
}
