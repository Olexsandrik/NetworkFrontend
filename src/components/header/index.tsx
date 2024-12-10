import React, { useContext, useState } from "react"
import { ThemeContext } from "../theme-provider"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Navbar>
      <NavbarBrand>
        <p className="fond-bold text-inherit">Network social</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex text-3xl cursor-pointer"
        onClick={()=>toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>

        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}