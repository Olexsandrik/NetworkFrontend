import React from "react"
import { useCurrentQuery } from "../app/services/userApi"
import { Spinner } from "@nextui-org/react"

type Porps = {
  children: JSX.Element
}
export const AuthGuard = ({ children }: Porps) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner />
  }
  return children
}
