type Props = {
  children: string
  size?: string
}
export const Typography = ({ children, size = "text-xs" }: Props) => {
  return <p className={`${size}`}>{children}</p>
}
