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
import { ProfileInfo } from "../../components/profile-info"
import { formatToClientData } from "../../utils/format-to-client-data"
import { CountInfo } from "../../components/count-info"
import { api } from "../../app/services/api"
import { EditProfile } from "../../components/edit-profile"
import { hasErrorField } from "../../utils/has-error-field"

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
  const handleFollow = async () => {
    try {
      if (id) {
        if (data?.isFollowing) {
          await unfollowUser(id).unwrap()
        } else {
          await followUser({ followingId: id }).unwrap()
        }

        await triggerGetUserByIdQuery(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
        onClose()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        console.error(error.data.error)
      }
    }
  }
  if (!data) {
    return null
  }

  return (
    <>
      <GoBack />

      <div className="flex-items-center gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
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
                onClick={handleFollow}
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
              <Button onClick={() => onOpen()} endContent={<CiEdit />}>
                Редагувати
              </Button>
            )}
          </div>
        </Card>

        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Пошта" info={data.email} />
          <ProfileInfo title="Місце" info={data.location} />
          <ProfileInfo
            title="Дата народження"
            info={formatToClientData(data.dateOfBirth)}
          />
          <ProfileInfo title="Про мене" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Підписники" />
            <CountInfo count={data.following.length} title="Підписки" />
          </div>
          <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
        </Card>
      </div>
    </>
  )
}
