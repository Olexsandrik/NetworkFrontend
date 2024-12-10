import { Card, CardBody } from "@nextui-org/react"
import React, { useState } from "react"
import { Tabs, Tab } from "@nextui-org/react"
import { Login } from "../../features/login"
import { Register } from "../../features/register"
export const Auth = () => {
  const [selected, setSelected] = useState("sign-up")
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={key => setSelected(key as string)}
            >
              <Tab key="login" title="Вхід">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="sign-up" title="Регестрація">
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
