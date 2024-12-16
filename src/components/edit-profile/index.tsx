import React, { HTMLInputTypeAttribute, useContext, useState } from "react"
import { User } from "../../app/types"
import { ThemeContext } from "../theme-provider"
import { useUpDateUserMutation } from "../../app/services/userApi"
import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import { Input } from "../input"
import { MdOutlineEmail } from "react-icons/md"
import { ErrorMessage } from "../ErrorMessage"
import { Button } from "../Button"
import { NavButton } from "../nav-button"
import { Button as NextUiButton } from "@nextui-org/react"
import { hasErrorField } from "../../utils/has-error-field"
type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}
export const EditProfile = ({ isOpen, onClose, user }: Props) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpDateUserMutation()
  const [error, setError] = useState("")

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      bio: user?.bio,
      dateOfBirth: user?.dateOfBirth,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0])
    }
  }
  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData()
        data.name && formData.append("name", data.name)
        data.email &&
          data.email &&
          formData.append("email", data.email)
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          )
        data.bio && formData.append("bio", data.bio)
        data.location && formData.append("location", data.location)

        selectedFile && formData.append("avatar", selectedFile)

        await updateUser({ userData: formData, id }).unwrap()
        onClose()
      } catch (err) {
        if (hasErrorField(err)) {
          setError(err.data.error)
        } else {
        }
      }
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Поміняти профіль
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  control={control}
                  name="email"
                  label="email"
                  type="email"
                  endContent={<MdOutlineEmail />}
                />
                <Input control={control} name="name" label="name" type="text" />
                <input
                  type="file"
                  name="avatarUrl"
                  placeholder="Виберіть файл"
                  onChange={handleFileChange}
                />

                <Input
                  control={control}
                  name="dataOfBirht"
                  label="Дата народження"
                  type="date"
                  placeholder="Мій день народження"
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Ваша біографія"
                    />
                  )}
                />
                <Input
                  control={control}
                  name="location"
                  label="місто"
                  type="text"
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Обновіть профіль
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <NextUiButton color="danger" variant="light" onPress={onClose}>
                Закрити
              </NextUiButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
