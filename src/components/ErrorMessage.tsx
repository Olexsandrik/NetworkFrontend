import React from "react"
type Error = {
  error: string
}

export const ErrorMessage = ({ error }: Error) => {
  return error && <p className="text-red-500 mt-2 mb-5 text-samll">{error}</p>
}
