import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { resetUser, selectCurrent } from "../../features/userSlice"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi"
import { GoBack } from "../../components/go-back/GoBack"
import { BASE_URL } from "../../constants"
import {
  MdOutlinePersonAdd,
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure() // модалка зміни тепершнього користувача
  const currentUser = useSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const dispatch = useDispatch()
  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  if (!data) {
    return null
  }
  return (
    <>
      <GoBack />

      <div className="flex-items-center gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 item-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Відписатися" : "Підписатися"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />}>Редагувати</Button>
            )}
          </div>
        </Card>

        <Card className="flex flex-col space-y-4 p-5 flex-1">
            
        </Card>
      </div>
    </>
  )
}
