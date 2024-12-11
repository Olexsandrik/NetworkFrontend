import React from "react"
import { User as NextUiUser } from "@nextui-org/react"
import { BASE_URL } from "../../constants"
type Props = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

export const User = ({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}: Props) => {
  return (
    <NextUiUser
      name={name}
      className={className}
      description={description}
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
    />
  )
}
