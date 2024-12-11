import React, { useContext, useState } from "react"
import { ThemeContext } from "../theme-provider"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../../features/userSlice"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }
  return (
    <Navbar>
      <NavbarBrand>
        <p className="fond-bold text-inherit">Network social</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogout}
            >
              <CiLogout /> <span>Вийти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
