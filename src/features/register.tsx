import React, { useState } from "react"
import { Input } from "../components/input"
import { useForm } from "react-hook-form"
import { Button, Link } from "@nextui-org/react"
import { useRegisterMutation } from "../app/services/userApi"
import { hasErrorField } from "../utils/has-error-field"
import { ErrorMessage } from "../components/ErrorMessage"

type Register = {
  email: string
  name: string
  password: string
}
type Props = {
  setSelected: (value: string) => void
}

export const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState("")

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (err) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="name"
        label="Ім'я"
        type="text"
        required="Обов'язкове поле"
      />
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
        Уже є акаунт?{" "}
        <Link
          size="sm"
          className="cursore-pointer"
          onPress={() => setSelected("login")}
        >
          Ввійдіть
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
