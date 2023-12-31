import React, { useContext, useEffect, useState } from 'react'
import Menu from './menu/Menu'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react"
import UserContext from '@/src/context/login/userContext'
import ItemsMenu from './menu/contain/ItemsMenu'

const SideBar = ({ rol }) => {
    const { dataUser, getDatos } = useContext(UserContext)
    useEffect(() => {
        getDatos()
    }, [])

    return (
        <aside className='gap-4 flex-wrap w-1/2 max-w-md h-screen hidden lg:flex'>
            <Card className='w-full' radius="none">
                <CardHeader className='flex gap-3 p-10'>
                    <Image src="/image/Logo-db.png" width={50} height={50} alt="Logotipo" radius="sm" />
                    <div className="flex flex-col">
                        <p className="text-md">DashBooks</p>
                        <p className="text-small text-default-500">{dataUser.role}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <Menu Pagina={ItemsMenu} />
                </CardBody>
            </Card>
        </aside>

    )
}

export default SideBar