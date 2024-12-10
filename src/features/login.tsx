import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../components/input"
import { Button, Link } from "@nextui-org/react"
import { useLazyCurrentQuery, useLoginMutation } from "../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "../components/ErrorMessage"
import { hasErrorField } from "../utils/has-error-field"
type Props = {
  setSelected: (value: string) => void
}
type Login = {
  email: string
  password: string
}
export const Login = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentQuery().unwrap();
      navigate('/')
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="email"
        type="email"
        required="Обов'язкове поле"
      />
      <Input
        control={control}
        name="password"
        label="пароль"
        type="password"
        required="Обов'язкове поле"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Немає акаунта?{" "}
        <Link
          size="sm"
          className="cursore-pointer"
          onPress={() => setSelected("sign-up")}
        >
          зарегайтесь
        </Link>
      </p>
      <div className="flex gap-2 jusify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Ввійти
        </Button>
      </div>
    </form>
  )
}
